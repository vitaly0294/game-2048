/* eslint-disable max-len */
import {
  left,
  right,
  up,
  down,
  arrowUp,
  arrowDown,
  arrowLeft,
  arrowRight
} from './constants';

import {
  generateGame,
  makeMoveInGame,
  check,
  player,
  resultsTable
} from './game.js';

import {
  keepPlaying,
  tryAgain
} from './message.js';

import {scoreGame} from './scoreGame.js';
import {timeGame} from './timeGame.js';
import {buttonBackStep} from './button.js';
import {authentication} from './authentication.js';
import {localStorageGame} from './localStorage.js';

import {sortTable} from './table.js';

export const askEventHendlers = () => {
  const body = document.querySelector('body');
  const container = body.querySelector('.container');
  const gameContainer = container.querySelector('.game-container');

  container.ondragstart = () => false;

  const addEventClick = () => {
    document.addEventListener('click', e => {
      const target = e.target;

      if (target.matches('.player-num')) sortTable('num');
      if (target.matches('.player-name')) sortTable('name');
      if (target.matches('.player-time')) sortTable('time');
      if (target.matches('.player-score')) sortTable('score');

      if (target.matches('.keep-playing-btn')) {
        keepPlaying.remove();
        check.press = 0;
      }

      if (target.matches('.back-step-btn') && buttonBackStep.check) {
        buttonBackStep.useBackStep();
        if (keepPlaying.check) keepPlaying.remove();
        if (tryAgain.check) tryAgain.remove();

        check.press = 0;
        player.numMov = 0;

        localStorageGame.set('game', player);
      }

      if (target.matches('.retry-btn') || target.matches('.restart-btn')) {
        if (player.bestTime) {
          sortTable('num');

          resultsTable.push([
            resultsTable.length,
            player.name,
            Math.floor(player.bestTime),
            player.bestScore
          ]);

          localStorageGame.set('table', resultsTable);
          sortTable();
          scoreGame.updateScoreTopPlay(resultsTable);
          timeGame.updateTimeTopPlay(resultsTable);
        }

        generateGame('restart');

        if (keepPlaying.check) keepPlaying.remove();
        if (tryAgain.check) tryAgain.remove();

        check.press = 0;
      }

      if (target.matches('.authentication__icon') || target.closest('.authentication__name')) {
        authentication.setNewPlayer();
      }
    })
  };

  const addEventKeyboard = () => {
    document.addEventListener('keydown', e => {
      if (check.press === 0) {
        if (e.key === arrowUp || e.key === arrowDown) e.preventDefault();
        if (e.key === arrowUp) makeMoveInGame(up);
        if (e.key === arrowDown) makeMoveInGame(down);
        if (e.key === arrowLeft) makeMoveInGame(left);
        if (e.key === arrowRight) makeMoveInGame(right);
      }

      if (e.key === arrowUp|| e.key === arrowDown || e.key === arrowLeft || e.key === arrowRight) {
        if (!timeGame.startTimeGame) timeGame.setStartTimeGame();
      }
    });
  };

  const addEventPointer = () => {
    gameContainer.addEventListener('pointerdown', (eStart) => {
      if (check.press === 0) {
        const startClientX = eStart.clientX;
        const startClientY = eStart.clientY;
        const pointerType = eStart.pointerType;
        const isPrimary = eStart.isPrimary;

        if ((pointerType !== 'touch') ||
            (pointerType === 'touch' && isPrimary === true)) {
          document.addEventListener('pointerup', function endPoint(eEnd) {
            const endClientX = eEnd.clientX;
            const endClientY = eEnd.clientY;
            const diffX = endClientX - startClientX;
            const diffY = endClientY - startClientY;
            const absDiffX = Math.abs(diffX);
            const absDiffY = Math.abs(diffY);

            if (absDiffX > 20 || absDiffY > 20) {
              timeGame.startTimeGame ? '' : timeGame.setStartTimeGame();
              if (absDiffX > absDiffY) {
                diffX > 0 ? makeMoveInGame(right) : makeMoveInGame(left);
              }
              if (absDiffX < absDiffY) {
                diffY > 0 ? makeMoveInGame(down) : makeMoveInGame(up);
              }
            }
            document.removeEventListener('pointerup', endPoint);
          });
        }
      }
    });
  };

  addEventKeyboard();
  addEventPointer();
  addEventClick();
}
