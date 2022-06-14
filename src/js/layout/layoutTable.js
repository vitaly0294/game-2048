export const layoutTable = () => {
	const gameContainer = document.querySelector('.game-container');
	const table = document.createElement('div');
	const nameLine = document.createElement('div');
	const emptyBlock = document.createElement('div');
	const nameColumnTableNum = document.createElement('div');
	const nameColumnTableName = document.createElement('div');
	const nameColumnTableTime = document.createElement('div');
	const nameColumnTableScore = document.createElement('div');

	table.className = 'table';
	nameLine.className = 'name-line';
	emptyBlock.className = 'empty-block empty-block_active';
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
	table.append(emptyBlock);

	nameColumnTableNum.textContent = '№';
	nameColumnTableName.textContent = 'PLAYER';
	nameColumnTableTime.textContent = 'TIME UNTILE 2048';
	nameColumnTableScore.textContent = 'MAX SCORE';
	emptyBlock.textContent = `It's empty here! Be the first!`;
}
