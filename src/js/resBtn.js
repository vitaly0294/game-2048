export const resBtn = () => {
	const heading = document.querySelector('.heading');
	const resBtnContainer = document.createElement('div');
	const restartBtn = document.createElement('a');

	resBtnContainer.className = 'res-btn-container';
	restartBtn.className = 'restart-btn';

	heading.after(resBtnContainer);
	resBtnContainer.append(restartBtn);
};
