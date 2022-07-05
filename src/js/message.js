let gameMessage;
let textMessage;
let retryButton;
let keepPlayingButton;

const setMessageActive = () => {
  gameMessage = document.querySelector('.game-message');
  textMessage = document.querySelector('.game-message__text');
  gameMessage.classList.add('game-message_active');
}

const removeMessageActive = () => {
  gameMessage.classList.remove('game-message_active');
  textMessage.textContent = '';
}

export const tryAgain = {
  check: 0,
  set() {
    setMessageActive();
    retryButton = document.querySelector('.retry-btn');
    retryButton.classList.add('retry-btn_active');
    textMessage.textContent = 'Game Over';
    this.check = 1;
  },

  remove() {
    removeMessageActive();
    retryButton.classList.remove('retry-btn_active');
    this.check = 0;
  }
}

export const keepPlaying = {
  check: 0,
  set() {
    setMessageActive();
    keepPlayingButton = document.querySelector('.keep-playing-btn');
    keepPlayingButton.classList.add('keep-playing-btn_active');
    textMessage.textContent = 'Do you want to continue?';
    this.check = 1;
  },

  remove() {
    removeMessageActive();
    keepPlayingButton.classList.remove('keep-playing-btn_active');
    this.check = 0;
  }
}
