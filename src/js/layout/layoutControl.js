import {buttonBackStep} from '../button.js'

export const createLayoutControlBlock = () => {
  const header = document.querySelector('.header');
  const restartButtonContainer = document.createElement('div');
  const restartButton = document.createElement('a');
  const backStep = document.createElement('a');

  restartButtonContainer.className = 'btn-container';
  restartButton.className = 'restart-btn restart-btn_active';
  backStep.className = 'back-step-btn';

  header.after(restartButtonContainer);
  restartButtonContainer.append(restartButton);
  restartButtonContainer.append(backStep);

  restartButton.textContent = 'New Game';
  backStep.textContent = 'Back Step';

  buttonBackStep.block = backStep;
};
