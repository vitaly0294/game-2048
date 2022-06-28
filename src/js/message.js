class GameMessage {
  constructor({
    gameMessage = '.game-message',
    textMessage = '.game-message__text',
  } = {}) {
    this.gameMessage = document.querySelector(gameMessage);
    this.textMessage = document.querySelector(textMessage);
  }

  set() {
    this.gameMessage.classList.add('game-message_active');
  }

  remove() {
    this.gameMessage.classList.remove('game-message_active');
    this.textMessage.textContent = '';
  }
}

export class TryAgain extends GameMessage {
  constructor({
    gameMessage,
    textMessage,
    retryBtn = '.retry-btn'
  } = {}) {
    super(gameMessage, textMessage);
    this.retryBtn = document.querySelector(retryBtn);
  }

  setTryAgain() {
    super.set();
    this.retryBtn.classList.add('retry-btn_active');
    this.textMessage.textContent = 'Game Over';
  }

  removeTryAgain() {
    super.remove();
    this.retryBtn.classList.remove('retry-btn_active');
  }
}

export class KeepPlaying extends GameMessage {
  constructor({
    gameMessage,
    textMessage,
    keepPlayingBtn = '.keep-playing-btn',
  } = {}) {
    super(gameMessage, textMessage);
    this.keepPlayingBtn = document.querySelector(keepPlayingBtn);
  }

  setKeepPlaying() {
    super.set();
    this.keepPlayingBtn.classList.add('keep-playing-btn_active');
    this.textMessage.textContent = 'Do you want to continue?';
  }

  removeKeepPlaying() {
    super.remove();
    this.keepPlayingBtn.classList.remove('keep-playing-btn_active');
  }
}
