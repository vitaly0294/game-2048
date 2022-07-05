/* eslint-disable max-len */
import {
  generateGame,
  player
} from './game.js';

export const authentication = {
  name: '',
  newName: '',

  setNewPlayer() {
    this.name = document.querySelector('.authentication__name').children[0].textContent;
    this.newName = prompt('Enter your name', 'Anonymous');

    if (this.newName !== this.name && this.newName !== null) {
      generateGame('restart');
      player.name = this.newName;
      this.updatePlayerName();
    }
  },

  updatePlayerName() {
    this.name = document.querySelector('.authentication__name').children[0];
    this.name.textContent = `${this.newName}`;
  }
};
