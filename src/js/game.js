export const game = () => {
	// test matrix
	const gameMatrix = [
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
	];

	// const gameMatrix = [
	// 	[1, 2, 3, 4, 5],
	// 	[6, 7, 8, 9, 10],
	// 	[11, 12, 13, 14, 15],
	// 	[16, 17, 18, 19, 20],
	// 	[21, 22, 23, 24, 25],
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

	// render cells
	const renderGameMatrix = gameMatrix => {
		const tileContainer = document.querySelector('.tile-container');
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

	// add event listener
	const addEventListenerMoveLeft = () => {
		// const container = document.querySelector('.container');
		window.addEventListener('keydown', e => {
			if (e.key === 'ArrowLeft') console.log(e.key);
		});
		window.addEventListener('pointermove', (e) => {
			console.log(e.clientX);
		});
	}

	// start game
	const start = () => {
		layoutGeneration();
		startGame(gameMatrix);
		renderGameMatrix(gameMatrix);
		addEventListenerMoveLeft();
	}

	start();
}
