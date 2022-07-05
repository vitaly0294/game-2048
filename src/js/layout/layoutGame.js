export const createLayoutGameBlock = () => {
  const buttonsContainer = document.querySelector('.btn-container');

  const gameContainer = document.createElement('div');
  const gridContainer = document.createElement('div');
  const tileContainer = document.createElement('div');
  const gameMessage = document.createElement('div');
  const gameMessageText = document.createElement('p');
  const gameMessageButton = document.createElement('div');
  const retryButton = document.createElement('a');
  const keepPlayingButton = document.createElement('a');

  gameContainer.className = 'game-container';
  gridContainer.className = 'grid-container';
  tileContainer.className = 'tile-container';
  gameMessage.className = 'game-message';
  gameMessageText.className = 'game-message__text';
  gameMessageButton.className = 'game-message__btn';
  retryButton.className = 'retry-btn';
  keepPlayingButton.className = 'keep-playing-btn';

  buttonsContainer.after(gameContainer);
  gameContainer.append(gameMessage);
  gameMessage.append(gameMessageText);
  gameMessage.append(gameMessageButton);
  gameMessageButton.append(retryButton);
  gameMessageButton.append(keepPlayingButton);
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

  retryButton.textContent = 'Try again';
  keepPlayingButton.textContent = 'Keep going';
}
