import {
  player,
  clearContainer,
  renderGameMatrix
} from './game.js';

import {copyGameMatrix} from './function.js';
import {scoreGame} from './scoreGame.js';
import {localStorageGame} from './localStorage.js';

export const buttonBackStep = {
  check: 0,
  block: document.querySelector('.back-step-btn'),

  useBackStep() {
    copyGameMatrix(player.gameMatrixPrevState, player.gameMatrix);
    clearContainer();
    renderGameMatrix(player.gameMatrix);
    scoreGame.scorePlay = scoreGame.scorePlayPrev;
    scoreGame.updateScore('backStep');
    this.removeActiveBlock();

    player.score = scoreGame.scorePlay;
    player.scorePrevState = 0;
    localStorageGame.set('game', player);
  },

  setActiveBlock() {
    this.block.classList.add('back-step-btn_active');
    this.check = 1;
  },

  removeActiveBlock() {
    if (this.block.classList.contains('back-step-btn_active')) {
      this.block.classList.remove('back-step-btn_active');
    }
    this.check = 0;
  },
};
