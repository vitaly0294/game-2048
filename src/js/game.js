/* eslint-disable max-len */
'use strict';

export const game = () => {
	// matrix
	const createNewArr = (row = 5, cell = 5) => {
		const arr = [];
		for (let i = 0; i < row; i++) {
			arr[i] = [];
			for (let j = 0; j < cell; j++) {
				arr[i].push(0);
			}
		}
		return arr;
	}

	let gameMatrix = createNewArr();
	const gameMatrixPrevState = createNewArr();

	// Clianing container
	const clianingContainer = () => {
		const tile = document.querySelectorAll('.tile');
		tile.forEach(item => {
			item.remove();
		});
	}

	// render cells
	const renderGameMatrix = (gameMatrix, arrAdd = []) => {
		const tileContainer = document.querySelector('.tile-container');
		gameMatrix.forEach((row, i) => {
			row.forEach((cell, j) => {
				if (cell !== 0) {
					const tile = document.createElement('div');
					const tileInner = document.createElement('div');

					tile.className = `tile tile-position-${i}-${j}`;
					tileInner.className = 'tile-inner';

					tileContainer.append(tile);
					tile.append(tileInner);

					tile.classList.add(`tile-${cell}`);
					tile.firstChild.textContent = `${cell}`;
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
	}

	// get Empty Cells
	const getEmptyCells = gameMatrix => {
		const arrEmptyCells = [];
		gameMatrix.forEach((row, i) => {
			row.forEach((cell, j) => {
				if (cell === 0) {
					arrEmptyCells.push([i, j])
				}
			});
		});
		return arrEmptyCells;
	};

	// get Random Сoordinates Cell
	const getRandomСoordinatesCell = arrEmptyCells => {
		const max = arrEmptyCells.length;
		const rand = Math.floor(Math.random() * max);
		return arrEmptyCells[rand];
	}

	// func random num 2 or 4 - 90% or 10% respectively
	const getRandomNumCell = (min = 1, max = 100) => {
		const rand = Math.floor(min + Math.random() * (max + 1 - min));
		return rand > 10 ? 2 : 4;
	}

	// record random num in matrix
	const recordRandomNumInMatrix = (coordinates, randomNum, matrix) => {
		matrix[coordinates[0]][coordinates[1]] = randomNum;
	}

	// start game
	const startGame = gameMatrix => {
		for (let cell = 0; cell < 2; cell++) {
			const arrEmptyCells = getEmptyCells(gameMatrix);
			recordRandomNumInMatrix(
				getRandomСoordinatesCell(arrEmptyCells),
				getRandomNumCell(),
				gameMatrix
			);
		}
	}

	// copy Game Matrix
	const copyGameMatrix = (oldMatrix, newMatrix = gameMatrix) => {
		oldMatrix.forEach((row, i) => {
			row.forEach((cell, j) => {
				newMatrix[i][j] = cell;
			});
		});
	}

	// remove or add class for animation
	const togleClassPosition = (iNew, jNew, i, j) => {
		const tilePosition = document.querySelector(`.tile-position-${i}-${j}`);
		tilePosition.classList.remove(`tile-position-${i}-${j}`);
		tilePosition.classList.add(`tile-position-${iNew}-${jNew}`)
	}

	// time game
	const timeGame = {
		startTimeGame: 0,
		intervalId: 0,
		timePlayBlock: document.querySelector('.time'),
		timePlay: 0,
		timeBestPlayBlock: document.querySelector('.best-time'),
		timeTopPlay: 0,

		timer() {
			this.intervalId = setInterval(this.updateTime.bind(this), 1000);
		},

		setStartTimeGame() {
			this.startTimeGame = Date.now();
			this.timer();
		},

		ressetTimeGame() {
			clearInterval(this.intervalId);
			this.startTimeGame = 0;
			this.timePlayBlock.textContent = `00:00:00`;
		},

		getTimeGameString(diff) {
			const hour = (diff / 3600 < 1) ? 0 : Math.floor(diff / 3600);
			const min = (diff / 60 - hour * 60 < 1) ? 0 : Math.floor(diff / 60 - hour * 60);
			const sec = (diff - (hour * 60 + min) * 60 < 1) ? 0 : Math.floor(diff - (hour * 60 + min) * 60);
			const res = (...time) => time.map(item => (String(item).length < 2) ? '0' + item : '' + item).join(':');

			return `${res(hour, min, sec)}`;
		},

		updateTime() {
			const timeNow = Date.now();
			this.timePlay = (timeNow - this.startTimeGame)/1000;
			this.timePlayBlock.textContent = this.getTimeGameString(this.timePlay);
		},
	}

	// score game
	const scoreGame = {
		scorePlay: 0,
		scorePlayBlock: document.querySelector('.score'),
		scoreTopPlay: 0,
		scoreTopPlayBlock: document.querySelector('.best-score'),
		scorePlayPrev: 0,

		addScore(score) {
			this.scorePlay+=score;
			this.updateScore();
		},

		resetScorePlay() {
			this.scorePlay = 0;
			this.scorePlayPrev = 0;
			this.updateScore();
		},

		updateScore(mode) {
			mode ? this.scorePlayBlock.textContent = `${this.scorePlayPrev}` : this.scorePlayBlock.textContent = `${this.scorePlay}`;
		}
	}

	// back step
	const btnBackStep = {
		checkBackStep: 0,
		checkCopyBackStep: 0,
		btn: document.querySelector('.back-step-btn'),

		backStep() {
			copyGameMatrix(gameMatrixPrevState, gameMatrix);
			clianingContainer();
			renderGameMatrix(gameMatrix);
			scoreGame.scorePlay = scoreGame.scorePlayPrev;
			scoreGame.updateScore('backStep');
			this.removeActionBtn();
		},

		setActionBtn() {
			this.btn.classList.add('back-step-btn_active');
			this.checkBackStep = 1;
		},

		removeActionBtn() {
			if (this.btn.classList.contains('back-step-btn_active')) {
				this.btn.classList.remove('back-step-btn_active');
			}
			this.checkBackStep = 0;
		},
	}

	const tryAgain = {
		setTryAgain() {
			const gameMessage = document.querySelector('.game-message');
			const retryBtn = gameMessage.querySelector('.retry-btn');
			const textMessage = gameMessage.querySelector('.game-message__text');

			gameMessage.classList.add('game-message_active');
			retryBtn.classList.add('retry-btn_active');
			textMessage.textContent = 'Game Over';
		},

		removeTryAgain() {
			const gameMessage = document.querySelector('.game-message');
			const retryBtn = gameMessage.querySelector('.retry-btn');
			const textMessage = gameMessage.querySelector('.game-message__text');

			gameMessage.classList.remove('game-message_active');
			retryBtn.classList.remove('retry-btn_active');
			textMessage.textContent = '';
		}

	}

	// check overflow matrix game
	const checkMatrixOverflow = matrix => {
		let check = 1;

		for (let i = 0; i < 5; i++) {
			for (let j = 0; j < 5; j++) {
				if (matrix[i][j] === 0) check = 0;
				if (j < 4) {
					if (matrix[i][j] === matrix[i][j + 1]) {
						check = 0;
					}
				}
			}
		}

		for (let j = 0; j < 5; j++) {
			for (let i = 0; i < 5; i++) {
				if (matrix[i][j] === 0) check = 0;
				if (i < 4) {
					if (matrix[i][j] === matrix[i + 1][j]) {
						check = 0;
					}
				}
			}
		}

		if (check === 1) {
			tryAgain.setTryAgain();
		}

		return console.log('check', check);
	}

	// move
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
							jNew !== j ? checkMove = 1 : '';
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
							jNew !== j ? checkMove = 1 : '';
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
							iNew !== i ? checkMove = 1 : '';
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
							iNew !== i ? checkMove = 1 : '';
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
	}

	// addition
	const addition = (derection, addMatrix) => {
		const arrAdd = [];
		let checkAddition = 0;

		if (derection === 'left' || derection === 'right') {
			for (let i = 0; i < 5; i++) {
				if (derection === 'left') {
					for (let j = 1; j < 5; j++) {
						if (addMatrix[i][j - 1] === addMatrix[i][j]) {
							(addMatrix[i][j] !== 0) ? togleClassPosition(i, j - 1, i, j) : '';

							addMatrix[i][j - 1] = addMatrix[i][j - 1] + addMatrix[i][j];

							if (addMatrix[i][j - 1] !== 0) {
								scoreGame.addScore(addMatrix[i][j - 1]);
								checkAddition = 1;
								arrAdd.push([i, j - 1]);
							}

							addMatrix[i][j] = 0;
							j < 4 ? j++ : '';
						}
					}
				}

				if (derection === 'right') {
					for (let j = 3; j > -1; j--) {
						if (addMatrix[i][j + 1] === addMatrix[i][j]) {
							(addMatrix[i][j] !== 0) ? togleClassPosition(i, j + 1, i, j) : '';

							addMatrix[i][j + 1] = addMatrix[i][j + 1] + addMatrix[i][j];

							if (addMatrix[i][j + 1] !== 0) {
								scoreGame.addScore(addMatrix[i][j + 1]);
								checkAddition = 1;
								arrAdd.push([i, j + 1]);
							}

							addMatrix[i][j] = 0;
							j < 0 ? j-- : '';
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
							(addMatrix[i][j] !== 0) ? togleClassPosition(i - 1, j, i, j) : '';

							addMatrix[i - 1][j] = addMatrix[i - 1][j] + addMatrix[i][j];

							if (addMatrix[i - 1][j] !== 0) {
								scoreGame.addScore(addMatrix[i - 1][j]);
								checkAddition = 1;
								arrAdd.push([i - 1, j]);
							}

							addMatrix[i][j] = 0;
							i < 4 ? i++ : '';
						}
					}
				}
				if (derection === 'down') {
					for (let i = 3; i > -1; i--) {
						if (addMatrix[i + 1][j] === addMatrix[i][j]) {
							(addMatrix[i][j] !== 0) ? togleClassPosition(i + 1, j, i, j) : '';

							addMatrix[i + 1][j] = addMatrix[i + 1][j] + addMatrix[i][j];

							if (addMatrix[i + 1][j] !== 0) {
								scoreGame.addScore(addMatrix[i + 1][j]);
								checkAddition = 1;
								arrAdd.push([i + 1, j]);
							}

							addMatrix[i][j] = 0;
							i < 0 ? i-- : '';
						}
					}
				}
			}
		}

		return {addMatrix, checkAddition, arrAdd};
	}

	let checkPress = 0;

	// move in the game
	const moveInGame = async (direction) => {
		const prevScoreGame = scoreGame.scorePlay;

		checkPress = 1;
		const gameMatrixFutureState = createNewArr();
		const {moveMatrix, checkMove} = await movement(direction, gameMatrix);

		copyGameMatrix(moveMatrix, gameMatrixFutureState);
		clianingContainer();
		renderGameMatrix(gameMatrixFutureState);

		const {addMatrix, checkAddition, arrAdd} = addition(direction, gameMatrixFutureState);
		copyGameMatrix(addMatrix, gameMatrixFutureState);

		if (checkAddition === 1) {
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
			copyGameMatrix(gameMatrix, gameMatrixPrevState);
			scoreGame.scorePlayPrev = prevScoreGame;

			arrEmptyCells.length < 2 ? checkMatrixOverflow(gameMatrixFutureState) : '';
		}

		copyGameMatrix(gameMatrixFutureState);
		clianingContainer();
		renderGameMatrix(gameMatrix);

		checkPress = 0;
	}

	// add event hendlers
	const eventHendlers = () => {
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

	// start game
	const start = (mode = '') => {
		if (mode === 'restart') {
			scoreGame.resetScorePlay();
			timeGame.ressetTimeGame();
			gameMatrix = createNewArr();
			clianingContainer();
		}
		startGame(gameMatrix);
		copyGameMatrix(gameMatrix, gameMatrixPrevState);
		renderGameMatrix(gameMatrix);
		btnBackStep.removeActionBtn();
	}

	start();
	eventHendlers();
}
