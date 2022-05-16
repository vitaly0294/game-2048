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

	const gameMatrix = createNewArr();

	// layout generation
	const layoutGeneration = () => {
		const resBtn = document.querySelector('.res-btn-container');
		const gameContainer = document.createElement('div');
		const gridContainer = document.createElement('div');
		const tileContainer = document.createElement('div');

		gameContainer.className = 'game-container';
		gridContainer.className = 'grid-container';
		tileContainer.className = 'tile-container';

		resBtn.after(gameContainer);
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
			console.log(arrAdd);
			arrAdd.forEach((cell) => {
				const tile = document.querySelector(`.tile-position-${cell[0]}-${cell[1]}`);
				console.log(tile);
				tile.style.transform = `translate(${cell[1] * 115}px, ${cell[0] * 115}px) scale(1.1)`;
				setTimeout(() => tile.style = false, 100);
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

	// entryNewGameMatrix
	const entryNewGameMatrix = moveMatrix => {
		moveMatrix.forEach((row, i) => {
			row.forEach((cell, j) => {
				gameMatrix[i][j] = cell;
			});
		});
	}

	// remove or add class for animation
	const togleClassPosition = (iNew, jNew, i, j) => {
		const tilePosition = document.querySelector(`.tile-position-${i}-${j}`);
		tilePosition.classList.remove(`tile-position-${i}-${j}`);
		tilePosition.classList.add(`tile-position-${iNew}-${jNew}`)
	}

	// move left
	const moveLeft = async () => {
		const moveMatrix = createNewArr();
		let checkMove = 0;

		for (let i = 0; i < 5; i++) {
			let jNew = 0;
			for (let j = 0; j < 5; j++) {
				if (gameMatrix[i][j] !== 0) {
					moveMatrix[i][jNew] = gameMatrix[i][j];
					togleClassPosition(i, jNew, i, j);
					if (jNew !== j) {
						checkMove = 1;
					}
					jNew++;
				}
			}
		}

		const timeout = new Promise(resolve => {
			setTimeout(() => resolve({moveMatrix, checkMove}), 100);
		});
		const result = await timeout;
		return result;
	}

	// move right
	const moveRight = async () => {
		const moveMatrix = createNewArr();
		let checkMove = 0;

		for (let i = 4; i > -1; i--) {
			let jNew = 4;
			for (let j = 4; j > -1; j--) {
				if (gameMatrix[i][j] !== 0) {
					moveMatrix[i][jNew] = gameMatrix[i][j];
					togleClassPosition(i, jNew, i, j);
					if (jNew !== j) {
						checkMove = 1;
					}
					jNew--;
				}
			}
		}

		const timeout = new Promise(resolve => {
			setTimeout(() => resolve({moveMatrix, checkMove}), 100);
		});
		const result = await timeout;
		return result;
	}

	// move up
	const moveUp = async () => {
		const moveMatrix = createNewArr();
		let checkMove = 0;
		for (let j = 0; j < 5; j++) {
			let iNew = 0;
			for (let i = 0; i < 5; i++) {
				if (gameMatrix[i][j] !== 0) {
					moveMatrix[iNew][j] = gameMatrix[i][j];
					togleClassPosition(iNew, j, i, j);
					if (iNew !== i) {
						checkMove = 1;
					}
					iNew++;
				}
			}
		}

		const timeout = new Promise(resolve => {
			setTimeout(() => resolve({moveMatrix, checkMove}), 100);
		});
		const result = await timeout;
		return result;
	}

	// move Down
	const moveDown = async () => {
		const moveMatrix = createNewArr();
		let checkMove = 0;

		for (let j = 4; j > -1; j--) {
			let iNew = 4;
			for (let i = 4; i > -1; i--) {
				if (gameMatrix[i][j] !== 0) {
					moveMatrix[iNew][j] = gameMatrix[i][j];
					togleClassPosition(iNew, j, i, j);
					if (iNew !== i) {
						checkMove = 1;
					}
					iNew--;
				}
			}
		}

		const timeout = new Promise(resolve => {
			setTimeout(() => resolve({moveMatrix, checkMove}), 100);
		});
		const result = await timeout;
		return result;
	}

	// add left
	const additionLeft = () => {
		const arrAdd = [];
		let checkAddition = 0;
		for (let i = 0; i < 5; i++) {
			for (let j = 1; j < 5; j++) {
				if (gameMatrix[i][j - 1] === gameMatrix[i][j]) {
					gameMatrix[i][j - 1] = gameMatrix[i][j - 1] + gameMatrix[i][j];

					if (gameMatrix[i][j - 1] !== 0) {
						checkAddition = 1;
						arrAdd.push([i, j - 1]);
					}

					if (j < 4) {
						gameMatrix[i][j] = 0;
						j++;
					} else {
						gameMatrix[i][j] = 0;
					}
				}
			}
		}
		return {checkAddition, arrAdd};
	}

	// add right
	const additionRight = () => {
		const arrAdd = [];
		let checkAddition = 0;
		for (let i = 0; i < 5; i++) {
			for (let j = 3; j > -1; j--) {
				if (gameMatrix[i][j + 1] === gameMatrix[i][j]) {
					gameMatrix[i][j + 1] = gameMatrix[i][j + 1] + gameMatrix[i][j];

					if (gameMatrix[i][j + 1] !== 0) {
						checkAddition = 1;
						arrAdd.push([i, j + 1]);
					}

					if (j < 0) {
						gameMatrix[i][j] = 0;
						j--;
					} else {
						gameMatrix[i][j] = 0;
					}
				}
			}
		}
		return {checkAddition, arrAdd};
	}

	// add Up
	const additionUp = () => {
		const arrAdd = [];
		let checkAddition = 0;
		for (let j = 0; j < 5; j++) {
			for (let i = 1; i < 5; i++) {
				if (gameMatrix[i - 1][j] === gameMatrix[i][j]) {
					gameMatrix[i - 1][j] = gameMatrix[i - 1][j] + gameMatrix[i][j];

					if (gameMatrix[i - 1][j] !== 0) {
						checkAddition = 1;
						arrAdd.push([i - 1, j]);
					}

					if (i < 4) {
						gameMatrix[i][j] = 0;
						i++;
					} else {
						gameMatrix[i][j] = 0;
					}
				}
			}
		}
		return {checkAddition, arrAdd};
	}

	// add down
	const additionDown = () => {
		const arrAdd = [];
		let checkAddition = 0;
		for (let j = 0; j < 5; j++) {
			for (let i = 3; i > -1; i--) {
				if (gameMatrix[i + 1][j] === gameMatrix[i][j]) {
					gameMatrix[i + 1][j] = gameMatrix[i + 1][j] + gameMatrix[i][j];

					if (gameMatrix[i + 1][j] !== 0) {
						checkAddition = 1;
						arrAdd.push([i + 1, j]);
					}

					if (i < 0) {
						gameMatrix[i][j] = 0;
						i--;
					} else {
						gameMatrix[i][j] = 0;
					}
				}
			}
		}
		return {checkAddition, arrAdd};
	}

	let checkPress = 0;

	// move in the game
	const moveInGame = async (directionMove, directionAdd) => {
		// console.log('--------');
		checkPress = 1;
		let move = await directionMove();

		entryNewGameMatrix(move.moveMatrix);
		clianingContainer();
		renderGameMatrix(gameMatrix);

		const add = directionAdd();

		if (add.checkAddition === 1) {
			clianingContainer();
			renderGameMatrix(gameMatrix, add.arrAdd.length > 0 ? add.arrAdd : []);
			move = await directionMove();
			entryNewGameMatrix(move.moveMatrix);
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

		const addEventKeyboard = () => {
			document.addEventListener('keydown', e => {
				(e.key === 'ArrowUp' && checkPress === 0) ? moveInGame(moveUp, additionUp) :
					(e.key === 'ArrowDown' && checkPress === 0) ? moveInGame(moveDown, additionDown) :
						(e.key === 'ArrowLeft' && checkPress === 0) ? moveInGame(moveLeft, additionLeft) :
							(e.key === 'ArrowRight' && checkPress === 0) ? moveInGame(moveRight, additionRight) : '';
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
								if (absDiffX > absDiffY) {
									diffX > 0 ? moveInGame(moveRight, additionRight) : moveInGame(moveLeft, additionLeft);
								}
								if (absDiffX < absDiffY) {
									diffY > 0 ? moveInGame(moveDown, additionDown) : moveInGame(moveUp, additionUp);
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
	}

	// start game
	const start = () => {
		layoutGeneration();
		startGame(gameMatrix);
		renderGameMatrix(gameMatrix);
		eventHendlers();
	}

	start();
}
