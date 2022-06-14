/* eslint-disable max-len */
import {
	start,
	moveInGame,
	check,
	keepPlaying,
	tryAgain,
	player,
	resultsTable
} from './game.js';

import {timeGame} from './timeGame.js';
import {btnBackStep} from './btn.js';
import {authentication} from './authentication.js';
import {localStorageGame} from './localStorage.js';

import {sortTable} from './table.js';

export const eventHendlers = () => {
	const body = document.querySelector('body');
	const container = body.querySelector('.container');
	const gameContainer = container.querySelector('.game-container');

	container.ondragstart = () => false;

	const addEventClick = () => {
		document.addEventListener('click', e => {
			const target = e.target;

			if (target.matches('.player-num')) sortTable('num');
			if (target.matches('.player-name')) sortTable('name');
			if (target.matches('.player-time')) sortTable('time');
			if (target.matches('.player-score')) sortTable('score');

			if (target.matches('.keep-playing-btn')) {
				keepPlaying.removeKeepPlaying();
				check.press = 0;
			}

			if (target.matches('.back-step-btn') && btnBackStep.checkBackStep) {
				btnBackStep.backStep();
				keepPlaying ? keepPlaying.removeKeepPlaying() : '';
				tryAgain ? tryAgain.removeTryAgain() : '';

				check.press = 0;
				player.numMov = 0;

				localStorageGame.set('game', player);
			}

			if (target.matches('.retry-btn') || target.matches('.restart-btn')) {
				if (player.bestTime) {
					sortTable('num');

					resultsTable.push([
						resultsTable.length,
						player.name,
						Math.floor(player.bestTime),
						player.bestScore
					]);

					localStorageGame.set('table', resultsTable);
					sortTable();
				}

				start('restart');
				keepPlaying ? keepPlaying.removeKeepPlaying() : '';
				tryAgain ? tryAgain.removeTryAgain() : '';
				check.press = 0;
			}

			if (target.matches('.authentication__icon') ||
					target.closest('.authentication__name')) {
				authentication.setNewPlayer();
			}
		})
	};

	const addEventKeyboard = () => {
		document.addEventListener('keydown', e => {
			if (check.press === 0) {
				if (e.key === 'ArrowUp') moveInGame('up');
				if (e.key === 'ArrowDown') moveInGame('down');
				if (e.key === 'ArrowLeft') moveInGame('left');
				if (e.key === 'ArrowRight') moveInGame('right');
			}

			if (e.key === 'ArrowUp'||
					e.key === 'ArrowDown' ||
					e.key === 'ArrowLeft' ||
					e.key === 'ArrowRight') {
				timeGame.startTimeGame ? '' : timeGame.setStartTimeGame();
			}
		});
	};

	const addEventPointer = () => {
		gameContainer.addEventListener('pointerdown', (eStart) => {
			if (check.press === 0) {
				const startClientX = eStart.clientX;
				const startClientY = eStart.clientY;
				const pointerType = eStart.pointerType;
				const isPrimary = eStart.isPrimary;

				if ((pointerType !== 'touch') ||
						(pointerType === 'touch' && isPrimary === true)) {
					document.addEventListener('pointerup', function endPoint(eEnd) {
						const endClientX = eEnd.clientX;
						const endClientY = eEnd.clientY;
						const diffX = endClientX - startClientX;
						const diffY = endClientY - startClientY;
						const absDiffX = Math.abs(diffX);
						const absDiffY = Math.abs(diffY);

						if (absDiffX > 20 || absDiffY > 20) {
							timeGame.startTimeGame ? '' : timeGame.setStartTimeGame();
							if (absDiffX > absDiffY) {
								diffX > 0 ? moveInGame('right') : moveInGame('left');
							}
							if (absDiffX < absDiffY) {
								diffY > 0 ? moveInGame('down') : moveInGame('up');
							}
						}
						document.removeEventListener('pointerup', endPoint);
					});
				}
			}
		});
	};

	addEventKeyboard();
	addEventPointer();
	addEventClick();
}
