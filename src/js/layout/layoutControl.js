import {btnBackStep} from '../btn.js'

export const layoutControl = () => {
	const header = document.querySelector('.header');
	const resBtnContainer = document.createElement('div');
	const restartBtn = document.createElement('a');
	const backStep = document.createElement('a');

	resBtnContainer.className = 'btn-container';
	restartBtn.className = 'restart-btn restart-btn_active';
	backStep.className = 'back-step-btn';

	header.after(resBtnContainer);
	resBtnContainer.append(restartBtn);
	resBtnContainer.append(backStep);

	restartBtn.textContent = 'New Game';
	backStep.textContent = 'Back Step';

	btnBackStep.btn = backStep;
};
