export const layoutGame = () => {
	const btn = document.querySelector('.btn-container');
	const gameContainer = document.createElement('div');
	const gridContainer = document.createElement('div');
	const tileContainer = document.createElement('div');
	const gameMessage = document.createElement('div');
	const gameMessageText = document.createElement('p');
	const gameMessageBtn = document.createElement('div');
	const retryBtn = document.createElement('a');
	const keepPlayingBtn = document.createElement('a');

	gameContainer.className = 'game-container';
	gridContainer.className = 'grid-container';
	tileContainer.className = 'tile-container';
	gameMessage.className = 'game-message';
	gameMessageText.className = 'game-message__text';
	gameMessageBtn.className = 'game-message__btn';
	retryBtn.className = 'retry-btn';
	keepPlayingBtn.className = 'keep-playing-btn';

	btn.after(gameContainer);
	gameContainer.append(gameMessage);
	gameMessage.append(gameMessageText);
	gameMessage.append(gameMessageBtn);
	gameMessageBtn.append(retryBtn);
	gameMessageBtn.append(keepPlayingBtn);
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

	retryBtn.textContent = 'Try again';
	keepPlayingBtn.textContent = 'Keep going';
}
