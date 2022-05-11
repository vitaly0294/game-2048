/* eslint-disable max-len */
'use strict';

export const game = () => {
	// test matrix
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


	// const gameMatrix = [
	// 	[1, 2, 3, 4, 5],
	// 	[6, 7, 8, 9, 10],
	// 	[11, 12, 13, 14, 15],
	// 	[16, 17, 18, 19, 20],
	// 	[21, 22, 23, 24, j
	// ];

	// const gameMatrix = [
	// 	[2, 0, 2048, 0, 64],
	// 	[0, 4, 0, 128, 0],
	// 	[0, 0, 8, 0, 0],
	// 	[0, 256, 0, 16, 0],
	// 	[512, 0, 1024, 0, 32],
	// ];

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
	const renderGameMatrix = gameMatrix => {
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
		const rand = Math.floor(Math.random() * (max + 1));
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
		let count = 0;
		// for (let i = 0; i < 5; i++) {
		// 	for (let j = 0; j < 5; j++) {
		// 		if (moveMatrix[i][j] !== gameMatrix[i][j]) {
		// 			console.log(1);
		// 			break;
		// 		}
		// 	}
		// }

		moveMatrix.forEach((row, i) => {
			row.forEach((cell, j) => {
				if (moveMatrix[i][j] === gameMatrix[i][j]) {
					count++;
				}
				gameMatrix[i][j] = cell;
			});
		});
		count === 25 ? console.log('равны') : console.log('не равны');
	}

	// remove or add class for animation
	const togleClassPosition = (iNew, jNew, i, j) => {
		const tilePosition = document.querySelector(`.tile-position-${i}-${j}`);
		tilePosition.classList.remove(`tile-position-${i}-${j}`);
		tilePosition.classList.add(`tile-position-${iNew}-${jNew}`)
	}

	// move left
	const moveLeft = () => {
		const moveMatrix = createNewArr();

		for (let i = 0; i < 5; i++) {
			let jNew = 0;
			for (let j = 0; j < 5; j++) {
				if (gameMatrix[i][j] !== 0) {
					moveMatrix[i][jNew] = gameMatrix[i][j];
					togleClassPosition(i, jNew, i, j);
					jNew++;
				}
			}
		}
		return moveMatrix;
	}

	// move right
	const moveRight = () => {
		const moveMatrix = createNewArr();

		for (let i = 4; i > -1; i--) {
			let jNew = 4;
			for (let j = 4; j > -1; j--) {
				if (gameMatrix[i][j] !== 0) {
					moveMatrix[i][jNew] = gameMatrix[i][j];
					togleClassPosition(i, jNew, i, j);
					jNew--;
				}
			}
		}
		return moveMatrix;
	}

	// move up
	const moveUp = () => {
		const moveMatrix = createNewArr();

		for (let j = 0; j < 5; j++) {
			let iNew = 0;
			for (let i = 0; i < 5; i++) {
				if (gameMatrix[i][j] !== 0) {
					moveMatrix[iNew][j] = gameMatrix[i][j];
					togleClassPosition(iNew, j, i, j);
					iNew++;
				}
			}
		}
		return moveMatrix;
	}

	// move Down
	const moveDown = () => {
		const moveMatrix = createNewArr();

		for (let j = 4; j > -1; j--) {
			let iNew = 4;
			for (let i = 4; i > -1; i--) {
				if (gameMatrix[i][j] !== 0) {
					moveMatrix[iNew][j] = gameMatrix[i][j];
					togleClassPosition(iNew, j, i, j);
					iNew--;
				}
			}
		}
		return moveMatrix;
	}

	const additionLeft = () => {
		for (let i = 0; i < 5; i++) {
			for (let j = 1; j < 5; j++) {
				if (gameMatrix[i][j - 1] === gameMatrix[i][j]) {
					gameMatrix[i][j - 1] = gameMatrix[i][j - 1] + gameMatrix[i][j];
					if (j === 4) {
						gameMatrix[i][j] = 0;
					} else {
						gameMatrix[i][j] = gameMatrix[i][j + 1];
					}
				}
			}
		}
	}

	const additionRight = () => {
		for (let i = 0; i < 5; i++) {
			for (let j = 3; j > -1; j--) {
				if (gameMatrix[i][j + 1] === gameMatrix[i][j]) {
					gameMatrix[i][j + 1] = gameMatrix[i][j + 1] + gameMatrix[i][j];
					if (j === 0) {
						gameMatrix[i][j] = 0;
					} else {
						gameMatrix[i][j] = gameMatrix[i][j - 1];
					}
				}
			}
		}
	}

	// add event hendlers
	const eventHendlers = () => {
		const container = document.querySelector('.container');
		container.ondragstart = () => false;

		const addEventKeyboard = () => {
			document.addEventListener('keydown', e => {
				if (e.key === 'ArrowUp') {
					entryNewGameMatrix(moveUp());
				}

				if (e.key === 'ArrowDown') {
					entryNewGameMatrix(moveDown());
				}

				if (e.key === 'ArrowLeft') {
					entryNewGameMatrix(moveLeft());
					clianingContainer();
					renderGameMatrix(gameMatrix);
					additionLeft();

					const arrEmptyCells = getEmptyCells(gameMatrix);
					recordRandomNumInMatrix(
						getRandomСoordinatesCell(arrEmptyCells),
						getRandomNumCell(),
						gameMatrix
					);
				}

				if (e.key === 'ArrowRight') {
					entryNewGameMatrix(moveRight());
					clianingContainer();
					renderGameMatrix(gameMatrix);
					additionRight();

					const arrEmptyCells = getEmptyCells(gameMatrix);
					recordRandomNumInMatrix(
						getRandomСoordinatesCell(arrEmptyCells),
						getRandomNumCell(),
						gameMatrix
					);
				}

				clianingContainer();
				renderGameMatrix(gameMatrix);
			});
		};

		const addEventPointer = () => {
			container.addEventListener('pointerdown', (eStart) => {
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
								diffX > 0 ? console.log('right X') : console.log('left X');
							}
							if (absDiffX < absDiffY) {
								diffY > 0 ? console.log('down Y') : console.log('up Y');
							}
						}
						container.removeEventListener('pointerup', endPoint);
					});
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
