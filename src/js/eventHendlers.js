/* eslint-disable max-len */
import {start, moveInGame, checkPress} from './game.js';
import {timeGame} from './timeGame.js';
import {btnBackStep} from './btn.js';
import {tryAgain} from './message.js';
import {authentication} from './authentication.js';

// add event hendlers
export const eventHendlers = () => {
	const container = document.querySelector('.container');
	const gameContainer = container.querySelector('.game-container');
	container.ondragstart = () => false;

	const addEventClick = () => {
		document.addEventListener('click', e => {
			const target = e.target;

			if (target.matches('.back-step-btn') && btnBackStep.checkBackStep) {
				btnBackStep.backStep();
				tryAgain.removeTryAgain();
			}

			if (target.matches('.retry-btn') || target.matches('.restart-btn')) {
				start('restart');
				tryAgain.removeTryAgain();
			}

			if (target.matches('.authentication__icon') || target.closest('.authentication__name')) {
				authentication.setNewPlayer();
			}
		})
	}

	const addEventKeyboard = () => {
		document.addEventListener('keydown', e => {
			if (checkPress === 0) {
				e.key === 'ArrowUp' ? moveInGame('up') :
					e.key === 'ArrowDown' ? moveInGame('down') :
						e.key === 'ArrowLeft' ? moveInGame('left') :
							e.key === 'ArrowRight' ? moveInGame('right') : '';
			}

			if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
				timeGame.startTimeGame ? '' : timeGame.setStartTimeGame();
			}
		});
	};

	const addEventPointer = () => {
		gameContainer.addEventListener('pointerdown', (eStart) => {
			if (checkPress === 0) {
				const startClientX = eStart.clientX;
				const startClientY = eStart.clientY;
				const pointerType = eStart.pointerType;
				const isPrimary = eStart.isPrimary;

				if ((pointerType !== 'touch') || (pointerType === 'touch' && isPrimary === true)) {
					gameContainer.addEventListener('pointerup', function endPoint(eEnd) {
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
						gameContainer.removeEventListener('pointerup', endPoint);
					});
				}
			}
		});
	};

	addEventKeyboard();
	addEventPointer();
	addEventClick();
}
