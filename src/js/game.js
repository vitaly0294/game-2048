/* eslint-disable max-len */
import {eventHendlers} from './eventHendlers.js';
import {Player} from './Player.js';
import {localStorageGame} from './localStorage.js';
import {timeGame} from './timeGame.js';
import {scoreGame} from './scoreGame.js';

import {
	createNewArr,
	getEmptyCells,
	getRandomСoordinatesCell,
	getRandomNumCell,
	recordRandomNumInMatrix,
	copyGameMatrix,
	checkMatrixOverflow
} from './function.js';

import {btnBackStep} from './btn.js';
import {authentication} from './authentication.js';

import {
	KeepPlaying,
	TryAgain
} from './Message.js';

import {renderTable} from './table.js';


export let player;
export let keepPlaying;
export let tryAgain;
export const check = {press: 0};
export let resultsTable = [];

export const clianingContainer = () => {
	const tile = document.querySelectorAll('.tile');
	tile.forEach(item => item.remove());
};

export const renderGameMatrix = (gameMatrix, arrAdd = []) => {
	const tileContainer = document.querySelector('.tile-container');
	gameMatrix.forEach((row, i) => {
		row.forEach((cell, j) => {
			if (cell !== 0) {
				const tile = document.createElement('div');
				const tileInner = document.createElement('span');
				tileInner.style.fontSize = '80px';

				tile.className = `tile tile-position-${i}-${j}`;
				tileInner.className = 'tile-inner';

				tileContainer.append(tile);
				tile.append(tileInner);

				tile.classList.add(`tile-${cell}`);
				tile.firstChild.textContent = `${cell}`;

				if (tileInner.offsetWidth > 100 * 0.9) { // переменная!!!!!!!!!!
					const styleTileInner = getComputedStyle(tileInner);
					tileInner.style.fontSize = `${styleTileInner.fontSize.slice(0, -2) * (100 * 0.9 / tileInner.offsetWidth)}px`;
				}
			}
		});
	});

	if (arrAdd.length > 0) {
		arrAdd.forEach((cell) => {
			const tile = document.querySelector(`.tile-position-${cell[0]}-${cell[1]}`);
			tile.style.transform = `translate(${cell[1] * 115}px, ${cell[0] * 115}px) scale(1.1)`;
			setTimeout(() => tile.style = false, 200);
		});
	}
};

const startGame = gameMatrix => {
	for (let cell = 0; cell < 2; cell++) {
		const arrEmptyCells = getEmptyCells(gameMatrix);

		recordRandomNumInMatrix(
			getRandomСoordinatesCell(arrEmptyCells),
			getRandomNumCell(),
			gameMatrix
		);
	}
};

// remove or add class for animation
const togleClassPosition = (iNew, jNew, i, j) => {
	const tilePosition = document.querySelector(`.tile-position-${i}-${j}`);
	tilePosition.classList.remove(`tile-position-${i}-${j}`);
	tilePosition.classList.add(`tile-position-${iNew}-${jNew}`)
};

const movement = async (derection, gameMatrix) => {
	const moveMatrix = createNewArr();
	let checkMove = 0;

	if (derection === 'left' || derection === 'right') {
		for (let i = 0; i < 5; i++) {
			if (derection === 'left') {
				let jNew = 0;
				for (let j = 0; j < 5; j++) {
					if (gameMatrix[i][j] !== 0) {
						moveMatrix[i][jNew] = gameMatrix[i][j];
						togleClassPosition(i, jNew, i, j);
						if (jNew !== j) checkMove = 1;
						jNew++;
					}
				}
			}

			if (derection === 'right') {
				let jNew = 4;
				for (let j = 4; j > -1; j--) {
					if (gameMatrix[i][j] !== 0) {
						moveMatrix[i][jNew] = gameMatrix[i][j];
						togleClassPosition(i, jNew, i, j);
						if (jNew !== j) checkMove = 1;
						jNew--;
					}
				}
			}
		}
	}

	if (derection === 'up' || derection === 'down') {
		for (let j = 0; j < 5; j++) {
			if (derection === 'up') {
				let iNew = 0;
				for (let i = 0; i < 5; i++) {
					if (gameMatrix[i][j] !== 0) {
						moveMatrix[iNew][j] = gameMatrix[i][j];
						togleClassPosition(iNew, j, i, j);
						if (iNew !== i) checkMove = 1;
						iNew++;
					}
				}
			}

			if (derection === 'down') {
				let iNew = 4;
				for (let i = 4; i > -1; i--) {
					if (gameMatrix[i][j] !== 0) {
						moveMatrix[iNew][j] = gameMatrix[i][j];
						togleClassPosition(iNew, j, i, j);
						if (iNew !== i) checkMove = 1;
						iNew--;
					}
				}
			}
		}
	}

	const timeout = new Promise(resolve => {
		setTimeout(() => resolve({moveMatrix, checkMove}), 100);
	});
	const result = await timeout;
	return result;
};

const addition = (derection, addMatrix) => {
	const arrAdd = [];
	let checkAddition;

	if (derection === 'left' || derection === 'right') {
		for (let i = 0; i < 5; i++) {
			if (derection === 'left') {
				for (let j = 1; j < 5; j++) {
					if (addMatrix[i][j - 1] === addMatrix[i][j]) {
						if (addMatrix[i][j] !== 0) togleClassPosition(i, j - 1, i, j);

						addMatrix[i][j - 1] = addMatrix[i][j - 1] + addMatrix[i][j];

						if (addMatrix[i][j - 1] !== 0) arrAdd.push([i, j - 1, addMatrix[i][j - 1]]);

						addMatrix[i][j] = 0;
						if (j < 4) j++;
					}
				}
			}

			if (derection === 'right') {
				for (let j = 3; j > -1; j--) {
					if (addMatrix[i][j + 1] === addMatrix[i][j]) {
						if (addMatrix[i][j] !== 0) togleClassPosition(i, j + 1, i, j);

						addMatrix[i][j + 1] = addMatrix[i][j + 1] + addMatrix[i][j];

						if (addMatrix[i][j + 1] !== 0) arrAdd.push([i, j + 1, addMatrix[i][j + 1]]);

						addMatrix[i][j] = 0;
						if (j < 0) j--;
					}
				}
			}
		}
	}

	if (derection === 'up' || derection === 'down') {
		for (let j = 0; j < 5; j++) {
			if (derection === 'up') {
				for (let i = 1; i < 5; i++) {
					if (addMatrix[i - 1][j] === addMatrix[i][j]) {
						if (addMatrix[i][j] !== 0) togleClassPosition(i - 1, j, i, j);

						addMatrix[i - 1][j] = addMatrix[i - 1][j] + addMatrix[i][j];

						if (addMatrix[i - 1][j] !== 0) arrAdd.push([i - 1, j, addMatrix[i - 1][j]]);

						addMatrix[i][j] = 0;
						if (i < 4) i++;
					}
				}
			}
			if (derection === 'down') {
				for (let i = 3; i > -1; i--) {
					if (addMatrix[i + 1][j] === addMatrix[i][j]) {
						if (addMatrix[i][j] !== 0) togleClassPosition(i + 1, j, i, j);

						addMatrix[i + 1][j] = addMatrix[i + 1][j] + addMatrix[i][j];

						if (addMatrix[i + 1][j] !== 0) arrAdd.push([i + 1, j, addMatrix[i + 1][j]]);

						addMatrix[i][j] = 0;
						if (i < 0) i--;
					}
				}
			}
		}
	}

	arrAdd.length > 0 ? checkAddition = 1 : checkAddition = 0;

	return {addMatrix, checkAddition, arrAdd};
};

export const moveInGame = async (direction) => {
	const prevScoreGame = scoreGame.scorePlay;

	check.press = 1;
	const gameMatrixFutureState = createNewArr();
	const {moveMatrix, checkMove} = await movement(direction, player.gameMatrix);

	copyGameMatrix(moveMatrix, gameMatrixFutureState);
	clianingContainer();
	renderGameMatrix(gameMatrixFutureState);

	const {addMatrix, checkAddition, arrAdd} = addition(direction, gameMatrixFutureState);

	copyGameMatrix(addMatrix, gameMatrixFutureState);

	if (checkAddition === 1) {
		scoreGame.addScore(arrAdd.reduce((sum, current) => sum + current[2], 0));

		clianingContainer();
		renderGameMatrix(gameMatrixFutureState, arrAdd.length > 0 ? arrAdd : []);

		const {moveMatrix} = await movement(direction, gameMatrixFutureState);
		copyGameMatrix(moveMatrix, gameMatrixFutureState);
	}

	if (checkAddition === 1 || checkMove === 1) {
		const arrEmptyCells = getEmptyCells(gameMatrixFutureState);

		recordRandomNumInMatrix(
			getRandomСoordinatesCell(arrEmptyCells),
			getRandomNumCell(),
			gameMatrixFutureState
		);

		btnBackStep.setActionBtn();
		copyGameMatrix(player.gameMatrix, player.gameMatrixPrevState);
		scoreGame.scorePlayPrev = prevScoreGame;
		player.scorePrevState = scoreGame.scorePlayPrev;
		player.numMov++;

		if (arrEmptyCells.length < 2) {
			if (checkMatrixOverflow(gameMatrixFutureState)) {
				tryAgain = new TryAgain();
				tryAgain.setTryAgain();
			}
		}
	}

	copyGameMatrix(gameMatrixFutureState, player.gameMatrix);

	clianingContainer();
	renderGameMatrix(player.gameMatrix);

	if (arrAdd.find(item => item[2] === 8) && !player.bestTime) { // !!!!!!!!!!!!!
		keepPlaying = new KeepPlaying();
		keepPlaying.setKeepPlaying();
		check.press = 1;
		player.bestTime = player.time;
	} else {
		check.press = 0;
	}

	if (player.bestTime) player.bestScore = player.score;

	localStorageGame.set('game', player);
};

export const start = mode => {
	if (mode !== 'resume') {
		if (mode === 'restart') {
			scoreGame.resetScorePlay();
			timeGame.ressetTimeGame();
			clianingContainer();
			player = new Player({});
			localStorageGame.remove('game');
		}

		player.gameMatrix = createNewArr();
		player.gameMatrixPrevState = createNewArr();

		startGame(player.gameMatrix);
		copyGameMatrix(player.gameMatrix, player.gameMatrixPrevState);

		btnBackStep.removeActionBtn();
	} else {
		scoreGame.scorePlay = player.score;
		scoreGame.scorePlayPrev = player.scorePrevState;
		scoreGame.updateScore();

		timeGame.timePlayOld = player.time;
		timeGame.updateTime('old game');

		authentication.name = player.name;
		authentication.updatePlayerName();

		player.numMov ? btnBackStep.setActionBtn() : '';
	}

	renderGameMatrix(player.gameMatrix);
};


export const game = () => {
	if (localStorageGame.check('game')) {
		const {
			name,
			score,
			scorePrevState,
			time,
			gameMatrix,
			gameMatrixPrevState,
			bestScore,
			bestTime,
			id,
			numMov
		} = localStorageGame.get('game');

		player = new Player({
			name,
			score,
			scorePrevState,
			time, gameMatrix,
			gameMatrixPrevState,
			bestScore, bestTime,
			id,
			numMov
		});

		start('resume');
	} else {
		player = new Player({});
		start();
	}

	if (localStorageGame.check('table')) {
		resultsTable = localStorageGame.get('table');
		renderTable();
	}

	eventHendlers();
};
