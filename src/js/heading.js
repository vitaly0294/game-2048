export const header = () => {
	const container = document.querySelector('.container');

	const heading = document.createElement('div');
	const title = document.createElement('h1');
	const scoresContainer = document.createElement('div');
	const scoreContainer = document.createElement('div');
	const bestContainer = document.createElement('div');

	heading.className = 'heading';
	title.className = 'title';
	scoresContainer.className = 'scores-container';
	scoreContainer.className = 'score-container';
	bestContainer.className = 'best-container';

	container.append(heading);
	heading.append(title);
	heading.append(scoresContainer);
	scoresContainer.append(scoreContainer);
	scoresContainer.append(bestContainer);
};
