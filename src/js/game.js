/* eslint-disable max-len */
import {eventHendlers} from './eventHendlers.js';
import {Player} from './Player.js';
import {localStorageGame} from './localStorage.js';
import {timeGame} from './timeGame.js';
import {scoreGame} from './scoreGame.js';

import {
  createAnimateMove,
  createAnimateAdd
} from './animatiom.js';

import {
  createNewArr,
  getEmptyCells,
  getRandomСoordinatesCell,
  getRandomNumCell,
  recordRandomNumInMatrix,
  copyGameMatrix,
  checkMatrixOverflow
} from './function.js';

import {btnBackStep} from './btn.js';
import {authentication} from './authentication.js';

import {
  KeepPlaying,
  TryAgain
} from './Message.js';

import {renderTable} from './table.js';

const baseAnimationTime = 25;
const tileTextHeightPercentage = 90;
const maxTileTextHeight = 80;

export let player;
export let keepPlaying;
export let tryAgain;
export const check = {press: 0};
export let resultsTable = [];

export const clianingContainer = () => {
  const tile = document.querySelectorAll('.tile');
  tile.forEach(item => item.remove());
};

const calcTileTextHeight = tileInner => {
  const styleTileInner = getComputedStyle(tileInner);
  const tileFontSize = styleTileInner.fontSize.slice(0, -2) * (tileTextHeightPercentage / tileInner.offsetWidth);
  tileInner.style.fontSize = `${tileFontSize > maxTileTextHeight ? maxTileTextHeight : tileFontSize}px`;
}

export const renderGameMatrix = gameMatrix => {
  const tileContainer = document.querySelector('.tile-container');
  gameMatrix.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell !== 0) {
        const tile = document.createElement('div');
        const tileInner = document.createElement('span');

        tile.className = `tile tile-position-${i}-${j}`;
        tileInner.className = 'tile-inner';

        tileContainer.append(tile);
        tile.append(tileInner);

        tile.classList.add(`tile-${cell}`);
        tile.firstChild.textContent = `${cell}`;

        calcTileTextHeight(tileInner);
      }
    });
  });
};

const startGame = gameMatrix => {
  for (let cell = 0; cell < 2; cell++) {
    const arrEmptyCells = getEmptyCells(gameMatrix);

    recordRandomNumInMatrix(
      getRandomСoordinatesCell(arrEmptyCells),
      getRandomNumCell(),
      gameMatrix
    );
  }
};

const movement = async (direction, gameMatrix) => {
  const moveMatrix = createNewArr();
  let checkMove = 0;

  if (direction === 'left' || direction === 'right') {
    for (let i = 0; i < 5; i++) {
      if (direction === 'left') {
        let jNew = 0;
        for (let j = 0; j < 5; j++) {
          if (gameMatrix[i][j] !== 0) {
            moveMatrix[i][jNew] = gameMatrix[i][j];

            createAnimateMove(baseAnimationTime, i, j, jNew - j, direction);

            if (jNew !== j) checkMove = 1;
            jNew++;
          }
        }
      }

      if (direction === 'right') {
        let jNew = 4;
        for (let j = 4; j > -1; j--) {
          if (gameMatrix[i][j] !== 0) {
            moveMatrix[i][jNew] = gameMatrix[i][j];

            createAnimateMove(baseAnimationTime, i, j, jNew - j, direction);

            if (jNew !== j) checkMove = 1;
            jNew--;
          }
        }
      }
    }
  }

  if (direction === 'up' || direction === 'down') {
    for (let j = 0; j < 5; j++) {
      if (direction === 'up') {
        let iNew = 0;
        for (let i = 0; i < 5; i++) {
          if (gameMatrix[i][j] !== 0) {
            moveMatrix[iNew][j] = gameMatrix[i][j];

            createAnimateMove(baseAnimationTime, i, j, iNew - i, direction);

            if (iNew !== i) checkMove = 1;
            iNew++;
          }
        }
      }

      if (direction === 'down') {
        let iNew = 4;
        for (let i = 4; i > -1; i--) {
          if (gameMatrix[i][j] !== 0) {
            moveMatrix[iNew][j] = gameMatrix[i][j];

            createAnimateMove(baseAnimationTime, i, j, iNew - i, direction);

            if (iNew !== i) checkMove = 1;
            iNew--;
          }
        }
      }
    }
  }

  const timeout = new Promise(resolve => setTimeout(() => resolve({moveMatrix, checkMove}), baseAnimationTime * 4));
  const result = await timeout;
  return result;
};

const addition = async (direction, addMatrix) => {
  const arrAdd = [];
  let checkAddition;

  if (direction === 'left' || direction === 'right') {
    for (let i = 0; i < 5; i++) {
      if (direction === 'left') {
        for (let j = 1; j < 5; j++) {
          if (addMatrix[i][j - 1] === addMatrix[i][j]) {
            addMatrix[i][j - 1] = addMatrix[i][j - 1] + addMatrix[i][j];

            if (addMatrix[i][j - 1] !== 0) {
              createAnimateAdd(baseAnimationTime, i, j, (j - 1) - j, direction);
              arrAdd.push([i, j - 1, addMatrix[i][j - 1]]);
            }

            addMatrix[i][j] = 0;
          }
        }
      }

      if (direction === 'right') {
        for (let j = 3; j > -1; j--) {
          if (addMatrix[i][j + 1] === addMatrix[i][j]) {
            addMatrix[i][j + 1] = addMatrix[i][j + 1] + addMatrix[i][j];

            if (addMatrix[i][j + 1] !== 0) {
              createAnimateAdd(baseAnimationTime, i, j, (j + 1) - j, direction);
              arrAdd.push([i, j + 1, addMatrix[i][j + 1]]);
            }

            addMatrix[i][j] = 0;
          }
        }
      }
    }
  }

  if (direction === 'up' || direction === 'down') {
    for (let j = 0; j < 5; j++) {
      if (direction === 'up') {
        for (let i = 1; i < 5; i++) {
          if (addMatrix[i - 1][j] === addMatrix[i][j]) {
            addMatrix[i - 1][j] = addMatrix[i - 1][j] + addMatrix[i][j];

            if (addMatrix[i - 1][j] !== 0) {
              createAnimateAdd(baseAnimationTime, i, j, (i - 1) - i, direction);
              arrAdd.push([i - 1, j, addMatrix[i - 1][j]]);
            }

            addMatrix[i][j] = 0;
          }
        }
      }
      if (direction === 'down') {
        for (let i = 3; i > -1; i--) {
          if (addMatrix[i + 1][j] === addMatrix[i][j]) {
            addMatrix[i + 1][j] = addMatrix[i + 1][j] + addMatrix[i][j];

            if (addMatrix[i + 1][j] !== 0) {
              createAnimateAdd(baseAnimationTime, i, j, (i + 1) - i, direction);
              arrAdd.push([i + 1, j, addMatrix[i + 1][j]]);
            }

            addMatrix[i][j] = 0;
          }
        }
      }
    }
  }

  arrAdd.length > 0 ? checkAddition = 1 : checkAddition = 0;

  const timeout = new Promise(resolve => setTimeout(() => resolve({addMatrix, checkAddition, arrAdd}), baseAnimationTime * 2));
  const result = await timeout;
  return result;
};

export const moveInGame = async (direction) => {
  const prevScoreGame = scoreGame.scorePlay;

  check.press = 1;
  const gameMatrixFutureState = createNewArr();
  const {moveMatrix, checkMove} = await movement(direction, player.gameMatrix);

  copyGameMatrix(moveMatrix, gameMatrixFutureState);
  clianingContainer();
  renderGameMatrix(gameMatrixFutureState);

  const {addMatrix, checkAddition, arrAdd} = await addition(direction, gameMatrixFutureState);

  copyGameMatrix(addMatrix, gameMatrixFutureState);

  if (checkAddition === 1) {
    scoreGame.addScore(arrAdd.reduce((sum, current) => sum + current[2], 0));

    clianingContainer();
    renderGameMatrix(gameMatrixFutureState);

    const {moveMatrix} = await movement(direction, gameMatrixFutureState);
    copyGameMatrix(moveMatrix, gameMatrixFutureState);
  }

  if (checkAddition === 1 || checkMove === 1) {
    const arrEmptyCells = getEmptyCells(gameMatrixFutureState);

    recordRandomNumInMatrix(
      getRandomСoordinatesCell(arrEmptyCells),
      getRandomNumCell(),
      gameMatrixFutureState
    );

    btnBackStep.setActionBtn();
    copyGameMatrix(player.gameMatrix, player.gameMatrixPrevState);
    scoreGame.scorePlayPrev = prevScoreGame;
    player.scorePrevState = scoreGame.scorePlayPrev;
    player.numMov++;

    if (arrEmptyCells.length < 2) {
      if (checkMatrixOverflow(gameMatrixFutureState)) {
        tryAgain = new TryAgain();
        tryAgain.setTryAgain();
      }
    }
  }

  copyGameMatrix(gameMatrixFutureState, player.gameMatrix);

  clianingContainer();
  renderGameMatrix(player.gameMatrix);

  if (arrAdd.find(item => item[2] === 8) && !player.bestTime) { // !!!!!!!!!!!!!
    keepPlaying = new KeepPlaying();
    keepPlaying.setKeepPlaying();
    check.press = 1;
    player.bestTime = player.time;
  } else {
    check.press = 0;
  }

  if (player.bestTime) player.bestScore = player.score;

  localStorageGame.set('game', player);
};

export const start = mode => {
  if (mode !== 'resume') {
    if (mode === 'restart') {
      scoreGame.resetScorePlay();
      timeGame.ressetTimeGame();
      clianingContainer();
      player = new Player({});
      localStorageGame.remove('game');
    }

    player.gameMatrix = createNewArr();
    player.gameMatrixPrevState = createNewArr();

    startGame(player.gameMatrix);
    copyGameMatrix(player.gameMatrix, player.gameMatrixPrevState);

    btnBackStep.removeActionBtn();
  } else {
    scoreGame.scorePlay = player.score;
    scoreGame.scorePlayPrev = player.scorePrevState;
    scoreGame.updateScore();

    timeGame.timePlayOld = player.time;
    timeGame.updateTime('old game');

    authentication.name = player.name;
    authentication.updatePlayerName();

    player.numMov ? btnBackStep.setActionBtn() : '';
  }

  renderGameMatrix(player.gameMatrix);
};

export const game = () => {
  if (localStorageGame.check('game')) {
    const {
      name,
      score,
      scorePrevState,
      time,
      gameMatrix,
      gameMatrixPrevState,
      bestScore,
      bestTime,
      id,
      numMov
    } = localStorageGame.get('game');

    player = new Player({
      name,
      score,
      scorePrevState,
      time,
      gameMatrix,
      gameMatrixPrevState,
      bestScore,
      bestTime,
      id,
      numMov
    });

    start('resume');
  } else {
    player = new Player({});
    start();
  }

  if (localStorageGame.check('table')) {
    resultsTable = localStorageGame.get('table');
    renderTable();
    scoreGame.updateScoreTopPlay(resultsTable);
    timeGame.updateTimeTopPlay(resultsTable);
  }

  eventHendlers();
};
