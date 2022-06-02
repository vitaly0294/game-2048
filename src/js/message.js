

import {resultsTable, player} from './game';

export const tryAgain = {
	gameMessage: document.querySelector('.game-message'),
	retryBtn: document.querySelector('.retry-btn'),
	textMessage: document.querySelector('.game-message__text'),

	setTryAgain() {
		this.gameMessage.classList.add('game-message_active');
		this.retryBtn.classList.add('retry-btn_active');
		this.textMessage.textContent = 'Game Over';
		resultsTable.set(player.id, [player.score, player.time, player.name]);
		console.log(resultsTable);
	},

	removeTryAgain() {
		this.gameMessage.classList.remove('game-message_active');
		this.retryBtn.classList.remove('retry-btn_active');
		this.textMessage.textContent = '';
	}
};
