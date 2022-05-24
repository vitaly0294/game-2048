export const header = () => {
	const container = document.querySelector('.container');

	const heading = document.createElement('div');
	const title = document.createElement('h1');
	const scoresContainer = document.createElement('div');
	const score = document.createElement('div');
	const bestScore = document.createElement('div');
	const timesContainer = document.createElement('div');
	const time = document.createElement('div');
	const bestTime = document.createElement('div');

	heading.className = 'heading';
	title.className = 'title';
	scoresContainer.className = 'scores-container';
	score.className = 'score';
	bestScore.className = 'best-score';

	timesContainer.className = 'times-container';
	time.className = 'time';
	bestTime.className = 'best-time';

	container.append(heading);
	heading.append(title);
	heading.append(scoresContainer);
	scoresContainer.append(score);
	scoresContainer.append(bestScore);

	heading.append(timesContainer);
	timesContainer.append(time);
	timesContainer.append(bestTime);

	title.textContent = '2048';
	score.textContent = '0';
	bestScore.textContent = '0';

	time.textContent = '00:00:00';
	bestTime.textContent = '00:00:00';
};
