export const game = () => {
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

	const tile = document.createElement('div');
	tile.className = 'tile';
	tileContainer.append(tile);
}
