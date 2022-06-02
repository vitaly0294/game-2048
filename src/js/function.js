import {tryAgain} from './message.js';

// create new matrix
export const createNewArr = (row = 5, cell = 5) => {
	const arr = [];
	for (let i = 0; i < row; i++) {
		arr[i] = [];
		for (let j = 0; j < cell; j++) {
			arr[i].push(0);
		}
	}
	return arr;
};

// get Empty Cells
export const getEmptyCells = gameMatrix => {
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
export const getRandomСoordinatesCell = arrEmptyCells => {
	const max = arrEmptyCells.length;
	const rand = Math.floor(Math.random() * max);
	return arrEmptyCells[rand];
};

// func random num 2 or 4 - 90% or 10% respectively
export const getRandomNumCell = (min = 1, max = 100) => {
	const rand = Math.floor(min + Math.random() * (max + 1 - min));
	return rand > 10 ? 2 : 4;
};

// record random num in matrix
export const recordRandomNumInMatrix = (coordinates, randomNum, matrix) => {
	matrix[coordinates[0]][coordinates[1]] = randomNum;
};

// copy Game Matrix
export const copyGameMatrix = (oldMatrix, newMatrix) => {
	oldMatrix.forEach((row, i) => {
		row.forEach((cell, j) => {
			newMatrix[i][j] = cell;
		});
	});
};

// check overflow matrix game
export const checkMatrixOverflow = matrix => {
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

	check === 1 ? tryAgain.setTryAgain() : '';
};

