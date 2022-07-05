/* eslint-disable max-len */
import {player} from './game.js';
import {localStorageGame} from './localStorage.js';

export const timeGame = {
  startTimeGame: 0,
  intervalId: 0,
  timePlayBlock: document.querySelector('.time'),
  timePlay: 0,
  timeBestPlayBlock: document.querySelector('.best-time'),
  timeTopPlay: 0,
  timePlayOld: 0,

  timer() {
    this.intervalId = setInterval(this.addTimeGame.bind(this), 1000);
  },

  setStartTimeGame() {
    this.startTimeGame = Date.now();
    this.timer();
  },

  ressetTimeGame() {
    clearInterval(this.intervalId);
    this.startTimeGame = 0;
    this.timePlayOld = 0;
    this.timePlayBlock.textContent = `00:00:00`;
  },

  getTimeGameString(diff) {
    const hour = (diff / 3600 < 1) ? 0 : Math.floor(diff / 3600);
    const min = (diff / 60 - hour * 60 < 1) ? 0 : Math.floor(diff / 60 - hour * 60);
    const sec = (diff - (hour * 60 + min) * 60 < 1) ? 0 : Math.floor(diff - (hour * 60 + min) * 60);
    const res = (...time) => time.map(item => (String(item).length < 2) ? '0' + item : '' + item).join(':');

    return `${res(hour, min, sec)}`;
  },

  addTimeGame() {
    const timeNow = Date.now();
    this.timePlay = (timeNow - this.startTimeGame)/1000 + this.timePlayOld;
    this.updateTime();
    player.time = this.timePlay;
    localStorageGame.set('game', player);
  },

  updateTime(mode) {
    this.timePlayBlock.textContent = mode ? this.getTimeGameString(this.timePlayOld) : this.getTimeGameString(this.timePlay);
  },

  findTimeTopPlay(table) {
    this.timeTopPlay = table.sort((a, b) => a[2] - b[2])[0][2];
  },

  updateTimeTopPlay(table) {
    this.findTimeTopPlay(table);
    this.timeBestPlayBlock.textContent = this.getTimeGameString(this.timeTopPlay);
  }
}
