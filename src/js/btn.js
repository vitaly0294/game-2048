import {player, clianingContainer, renderGameMatrix} from './game.js';
import {copyGameMatrix} from './function.js';
import {scoreGame} from './scoreGame.js';
import {localStorageGame} from './localStorage.js';

// back step
export const btnBackStep = {
	checkBackStep: 0,
	checkCopyBackStep: 0,
	btn: document.querySelector('.back-step-btn'),

	backStep() {
		copyGameMatrix(player.gameMatrixPrevState, player.gameMatrix);
		clianingContainer();
		renderGameMatrix(player.gameMatrix);
		scoreGame.scorePlay = scoreGame.scorePlayPrev;
		scoreGame.updateScore('backStep');
		this.removeActionBtn();

		player.score = scoreGame.scorePlay;
		player.scorePrevState = 0;
		localStorageGame.set('game', player);
	},

	setActionBtn() {
		this.btn.classList.add('back-step-btn_active');
		this.checkBackStep = 1;
	},

	removeActionBtn() {
		if (this.btn.classList.contains('back-step-btn_active')) {
			this.btn.classList.remove('back-step-btn_active');
		}
		this.checkBackStep = 0;
	},
};
