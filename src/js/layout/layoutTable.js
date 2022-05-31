export const layoutTable = () => {
	const gameContainer = document.querySelector('.game-container');
	const table = document.createElement('div');
	const nameLine = document.createElement('div');
	const nameColumnTableNum = document.createElement('div');
	const nameColumnTableName = document.createElement('div');
	const nameColumnTableTime = document.createElement('div');
	const nameColumnTableScore = document.createElement('div');

	table.className = 'table';
	nameLine.className = 'line';
	nameColumnTableNum.className = 'column player-num';
	nameColumnTableName.className = 'column player-name';
	nameColumnTableTime.className = 'column player-time';
	nameColumnTableScore.className = 'column player-score';

	gameContainer.after(table);
	table.append(nameLine);
	nameLine.append(nameColumnTableNum);
	nameLine.append(nameColumnTableName);
	nameLine.append(nameColumnTableTime);
	nameLine.append(nameColumnTableScore);

	nameColumnTableNum.textContent = '№';
	nameColumnTableName.textContent = 'PLAYER';
	nameColumnTableTime.textContent = 'TIME UNTILE 2048';
	nameColumnTableScore.textContent = 'MAX SCORE';
}
