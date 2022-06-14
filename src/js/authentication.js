/* eslint-disable max-len */
import {
	start,
	player
} from './game.js';

export const authentication = {
	authenticationName: '',
	name: '',

	setNewPlayer() {
		this.authenticationName = document.querySelector('.authentication__name').children[0];
		this.name = prompt('Enter your name', 'Anonymous');
		const oldName = this.authenticationName.textContent;

		if (this.name !== oldName && this.name !== null) {
			start('restart');
			player.name = this.name;
			this.updatePlayerName();
		}
	},

	updatePlayerName() {
		this.authenticationName = document.querySelector('.authentication__name').children[0];
		this.authenticationName.textContent = `${this.name}`;
	}

};
