/* eslint-disable max-len */

import {player} from './game.js';

// score game
export const scoreGame = {
	scorePlay: 0,
	scorePlayBlock: document.querySelector('.score'),
	scoreTopPlay: 0,
	scoreTopPlayBlock: document.querySelector('.best-score'),
	scorePlayPrev: 0,

	addScore(score) {
		this.scorePlay+=score;

		player.score = this.scorePlay; // player

		this.updateScore();
	},

	resetScorePlay() {
		this.scorePlay = 0;
		this.scorePlayPrev = 0;
		this.updateScore();
	},

	updateScore(mode) {
		this.scorePlayBlock.textContent = mode ? `${this.scorePlayPrev}` : `${this.scorePlay}`;
	}
}
