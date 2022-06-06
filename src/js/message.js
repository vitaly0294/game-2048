import {resultsTable, player} from './game.js';

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
		resultsTable.set(player.id, [player.score, 0, player.name]);
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
		resultsTable.set(player.id, [player.score, player.time, player.name]);
	}

	removeKeepPlaying() {
		super.remove();
		this.keepPlayingBtn.classList.remove('keep-playing-btn_active');
	}
}

// export const tryAgain = {
// 	// gameMessage: document.querySelector('.game-message'),
// 	// retryBtn: document.querySelector('.retry-btn'),
// 	// textMessage: document.querySelector('.game-message__text'),

// 	findElements() {
// 		this.gameMessage = document.querySelector('.game-message');
// 		this.retryBtn = document.querySelector('.retry-btn');
// 		this.textMessage = document.querySelector('.game-message__text');
// 	},

// 	setTryAgain() {
// 		this.gameMessage.classList.add('game-message_active');
// 		this.retryBtn.classList.add('retry-btn_active');
// 		this.textMessage.textContent = 'Game Over';
// 		resultsTable.set(player.id, [player.score, 0, player.name]);
// 	},

// 	removeTryAgain() {
// 		this.gameMessage.classList.remove('game-message_active');
// 		this.retryBtn.classList.remove('retry-btn_active');
// 		this.textMessage.textContent = '';
// 	}
// };

// export const keepPlaying = {
// 	// gameMessage: document.querySelector('.game-message'),
// 	// keepPlayingBtn: document.querySelector('.keep-playing-btn'),
// 	// textMessage: document.querySelector('.game-message__text'),

// 	findElements() {
// 		this.gameMessage = document.querySelector('.game-message');
// 		this.retryBtn = document.querySelector('.keep-playing-btn');
// 		this.textMessage = document.querySelector('.game-message__text');
// 		console.log(this.gameMessage);
// 	},

// 	setKeepPlaying() {
// 		keepPlaying.findElements();
// 		// this.gameMessage = document.querySelector('.game-message');
// 		// this.keepPlayingBtn = document.querySelector('.keep-playing-btn');
// 		// this.textMessage = document.querySelector('.game-message__text');

// 		this.gameMessage.classList.add('game-message_active');
// 		this.keepPlayingBtn.classList.add('keep-playing-btn_active');
// 		this.textMessage.textContent = 'Do you want to continue?';
// 		resultsTable.set(player.id, [player.score, player.time, player.name]);
// 	},

// 	removeKeepPlaying() {
// 		// this.gameMessage = document.querySelector('.game-message');
// 		// this.keepPlayingBtn = document.querySelector('.keep-playing-btn');
// 		// this.textMessage = document.querySelector('.game-message__text');

// 		this.gameMessage.classList.remove('game-message_active');
// 		this.keepPlayingBtn.classList.remove('keep-playing-btn_active');
// 		this.textMessage.textContent = '';
// 	},
// };


