export const btn = () => {
	const heading = document.querySelector('.heading');
	const resBtnContainer = document.createElement('div');
	const restartBtn = document.createElement('a');
	const backStep = document.createElement('a');

	resBtnContainer.className = 'btn-container';
	restartBtn.className = 'restart-btn';
	backStep.className = 'back-step-btn';

	heading.after(resBtnContainer);
	resBtnContainer.append(restartBtn);
	resBtnContainer.append(backStep);

	restartBtn.textContent = 'New Game';
	backStep.textContent = 'Back Step';
};
