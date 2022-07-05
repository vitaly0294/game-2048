import {resultsTable} from './game.js';
import {timeGame} from './timeGame.js';

export const renderTable = () => {
  const emptyBlock = document.querySelector('.empty-block');
  const table = document.querySelector('.table');
  emptyBlock.classList.remove('empty-block_active');

  resultsTable.map(item => {
    const columnTableNum = document.createElement('div');
    const columnTableName = document.createElement('div');
    const columnTableTime = document.createElement('div');
    const columnTableScore = document.createElement('div');
    const line = document.createElement('div');

    line.className = 'line';
    columnTableNum.className = 'column player-num';
    columnTableName.className = 'column player-name';
    columnTableTime.className = 'column player-time';
    columnTableScore.className = 'column player-score';

    table.append(line);
    line.append(columnTableNum);
    line.append(columnTableName);
    line.append(columnTableTime);
    line.append(columnTableScore);

    columnTableNum.textContent = `${item[0] + 1}`;
    columnTableName.textContent = `${item[1]}`;
    columnTableTime.textContent = `${timeGame.getTimeGameString(item[2])}`;
    columnTableScore.textContent = `${item[3]}`;
  });
};

const clearTable = () => {
  const line = document.querySelectorAll('.line');
  line.forEach(item => item.remove());
};

export const sortTable = (unit = '') => {
  if (unit === 'num' || unit === '')	resultsTable.sort((a, b) => a[0] - b[0]);
  if (unit === 'name') {
    resultsTable.sort((a, b) => {
      if (a[1] > b[1]) return 1;
      if (a[1] < b[1]) return -1;
      if (a[1] === b[1]) return 1;
    });
  }
  if (unit === 'time') resultsTable.sort((a, b) => a[2] - b[2]);
  if (unit === 'score') resultsTable.sort((a, b) => b[3] - a[3]);
  clearTable();
  renderTable();

  const column = document.querySelectorAll('.column');
  column.forEach((item) => {
    if (item.classList.contains(`player-${unit}`)) {
      item.classList.add('column_active');
    } else {
      item.classList.remove('column_active');
    }
  });
}

