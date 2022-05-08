export const game = () => {
	// test matrix
	// const gameMatrix = [
	// 	[0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0],
	// 	[0, 0, 0, 0, 0],
	// ];

	// const gameMatrix = [
	// 	[1, 2, 3, 4, 5],
	// 	[6, 7, 8, 9, 10],
	// 	[11, 12, 13, 14, 15],
	// 	[16, 17, 18, 19, 20],
	// 	[21, 22, 23, 24, 25],
	// ];

	const gameMatrix = [
		[2, 0, 2048, 0, 64],
		[0, 4, 0, 128, 0],
		[0, 0, 8, 0, 0],
		[0, 256, 0, 16, 0],
		[512, 0, 1024, 0, 32],
	];


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


	// add cell
	// const tile = document.createElement('div');
	// const tileInner = document.createElement('div');

	// tile.className = 'tile';
	// tileInner.className = 'tile-inner';

	// tileContainer.append(tile);
	// tile.append(tileInner);


	// tile.classList.add('tile-4');
	// tile.firstChild.textContent = `4`;


	// const widthCell = 115;
	// const heightCell = 115;


	// render cells
	const renderGameMatrix = gameMatrix => {
		gameMatrix.forEach((row, i) => {
			row.forEach((cell, j) => {
				if (cell!==0) {
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

	renderGameMatrix(gameMatrix);

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

	const arrEmptyCells = getEmptyCells(gameMatrix);

	// get Random Сoordinates Cell
	const getRandomСoordinatesCell = arrEmptyCells => {
		const max = arrEmptyCells.length;
		const rand = Math.floor(Math.random() * (max + 1));
		return arrEmptyCells[rand];
	}
	getRandomСoordinatesCell(arrEmptyCells);

	// next func random num 2 or 4...
}
