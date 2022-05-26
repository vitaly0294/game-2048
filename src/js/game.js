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

	// layout generation
	const layoutGeneration = () => {
		const btn = document.querySelector('.btn-container');
		const gameContainer = document.createElement('div');
		const gridContainer = document.createElement('div');
		const tileContainer = document.createElement('div');

		gameContainer.className = 'game-container';
		gridContainer.className = 'grid-container';
		tileContainer.className = 'tile-container';

		btn.after(gameContainer);
		gameContainer.append(gridContainer);

		for (let row = 0; row < 5; row++) {
			const gridRow = document.createElement('div');
			gridRow.className = 'grid-row';
			gridContainer.append(gridRow);

			for (let cell = 0; cell < 5; cell++) {
				const gridCell = document.createElement('div');
				gridCell.className = 'grid-cell';
				gridRow.append(gridCell);
			}
		}

		gameContainer.append(tileContainer);
	}

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

		copyScorePlay() {
			this.scorePlayPrev = this.scorePlay;
		},

		addScore(score) {
			this.scorePlay+=score;
			this.updateScore();
		},

		resetScorePlay() {
			this.scorePlay = 0;
			this.updateScore();
		},

		updateScore(mode) {
			mode ? this.scorePlayBlock.textContent = `${this.scorePlayPrev}` : this.scorePlayBlock.textContent = `${this.scorePlay}`;
		}
	}

	// back step
	const backStep = () => {
		copyGameMatrix(gameMatrixPrevState, gameMatrix);
		clianingContainer();
		renderGameMatrix(gameMatrix);
		scoreGame.updateScore('backStep');
	}

	// move
	const movement = async (derection) => {
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
	const addition = (derection) => {
		const arrAdd = [];
		let checkAddition = 0;

		if (derection === 'left' || derection === 'right') {
			for (let i = 0; i < 5; i++) {
				if (derection === 'left') {
					for (let j = 1; j < 5; j++) {
						if (gameMatrix[i][j - 1] === gameMatrix[i][j]) {
							(gameMatrix[i][j] !== 0) ? togleClassPosition(i, j - 1, i, j) : '';

							gameMatrix[i][j - 1] = gameMatrix[i][j - 1] + gameMatrix[i][j];

							if (gameMatrix[i][j - 1] !== 0) {
								scoreGame.addScore(gameMatrix[i][j - 1]);
								checkAddition = 1;
								arrAdd.push([i, j - 1]);
							}

							gameMatrix[i][j] = 0;
							j < 4 ? j++ : '';
						}
					}
				}

				if (derection === 'right') {
					for (let j = 3; j > -1; j--) {
						if (gameMatrix[i][j + 1] === gameMatrix[i][j]) {
							(gameMatrix[i][j] !== 0) ? togleClassPosition(i, j + 1, i, j) : '';

							gameMatrix[i][j + 1] = gameMatrix[i][j + 1] + gameMatrix[i][j];

							if (gameMatrix[i][j + 1] !== 0) {
								scoreGame.addScore(gameMatrix[i][j + 1]);
								checkAddition = 1;
								arrAdd.push([i, j + 1]);
							}

							gameMatrix[i][j] = 0;
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
						if (gameMatrix[i - 1][j] === gameMatrix[i][j]) {
							(gameMatrix[i][j] !== 0) ? togleClassPosition(i - 1, j, i, j) : '';

							gameMatrix[i - 1][j] = gameMatrix[i - 1][j] + gameMatrix[i][j];

							if (gameMatrix[i - 1][j] !== 0) {
								scoreGame.addScore(gameMatrix[i - 1][j]);
								checkAddition = 1;
								arrAdd.push([i - 1, j]);
							}

							gameMatrix[i][j] = 0;
							i < 4 ? i++ : '';
						}
					}
				}
				if (derection === 'down') {
					for (let i = 3; i > -1; i--) {
						if (gameMatrix[i + 1][j] === gameMatrix[i][j]) {
							(gameMatrix[i][j] !== 0) ? togleClassPosition(i + 1, j, i, j) : '';

							gameMatrix[i + 1][j] = gameMatrix[i + 1][j] + gameMatrix[i][j];

							if (gameMatrix[i + 1][j] !== 0) {
								scoreGame.addScore(gameMatrix[i + 1][j]);
								checkAddition = 1;
								arrAdd.push([i + 1, j]);
							}

							gameMatrix[i][j] = 0;
							i < 0 ? i-- : '';
						}
					}
				}
			}
		}

		return {checkAddition, arrAdd};
	}

	let checkPress = 0;

	// move in the game
	const moveInGame = async (direction) => {
		copyGameMatrix(gameMatrix, gameMatrixPrevState);
		scoreGame.copyScorePlay();

		checkPress = 1;
		let move = await movement(direction);

		copyGameMatrix(move.moveMatrix);
		clianingContainer();
		renderGameMatrix(gameMatrix);

		const add = addition(direction);

		if (add.checkAddition === 1) {
			clianingContainer();
			renderGameMatrix(gameMatrix, add.arrAdd.length > 0 ? add.arrAdd : []);
			move = await movement(direction);
			copyGameMatrix(move.moveMatrix);
		}

		if (add.checkAddition === 1 || move.checkMove === 1) {
			const arrEmptyCells = getEmptyCells(gameMatrix);
			recordRandomNumInMatrix(
				getRandomСoordinatesCell(arrEmptyCells),
				getRandomNumCell(),
				gameMatrix
			);
		}

		clianingContainer();
		renderGameMatrix(gameMatrix);

		checkPress = 0;
	}

	// add event hendlers
	const eventHendlers = () => {
		const container = document.querySelector('.container');
		container.ondragstart = () => false;

		const addEventClick = () => {
			document.addEventListener('click', e => {
				const target = e.target;
				target.matches('.restart-btn') ? start('restart') :
					target.matches('.back-step-btn') ? backStep() : '';
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
			container.addEventListener('pointerdown', (eStart) => {
				if (checkPress === 0) {
					const startClientX = eStart.clientX;
					const startClientY = eStart.clientY;
					const pointerType = eStart.pointerType;
					const isPrimary = eStart.isPrimary;

					if ((pointerType !== 'touch') || (pointerType === 'touch' && isPrimary === true)) {
						container.addEventListener('pointerup', function endPoint(eEnd) {
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
							container.removeEventListener('pointerup', endPoint);
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
	}

	layoutGeneration();
	start();
	eventHendlers();
}
