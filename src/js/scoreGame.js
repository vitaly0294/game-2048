/* eslint-disable max-len */

import {player} from './game.js';

export const scoreGame = {
	scorePlay: 0,
	scorePlayBlock: document.querySelector('.score'),
	scoreTopPlay: 0,
	scoreTopPlayBlock: document.querySelector('.best-score'),
	scorePlayPrev: 0,

	addScore(score) {
		this.scorePlay += score;

		player.score = this.scorePlay;

		this.updateScore();
	},

	resetScorePlay() {
		this.scorePlay = 0;
		this.scorePlayPrev = 0;
		this.updateScore();
	},

	updateScore(mode) {
		this.scorePlayBlock.textContent = mode ? `${this.scorePlayPrev}` : `${this.scorePlay}`;
	},

	findScoreTopPlay(table) {
		this.scoreTopPlay = table.sort((a, b) => b[3] - a[3])[0][3];
	},

	updateScoreTopPlay(table) {
		this.findScoreTopPlay(table);
		this.scoreTopPlayBlock.textContent = this.scoreTopPlay;
	}
}
