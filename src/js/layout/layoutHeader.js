import {scoreGame} from '../scoreGame.js';
import {timeGame} from '../timeGame.js'

export const layoutHeader = () => {
  const container = document.querySelector('.container');

  const header = document.createElement('div');
  const title = document.createElement('h1');
  const authentication = document.createElement('div');
  const authenticationName = document.createElement('div');
  const authenticationIcon = document.createElement('div');
  const scoresContainer = document.createElement('div');
  const score = document.createElement('div');
  const bestScore = document.createElement('div');
  const timesContainer = document.createElement('div');
  const time = document.createElement('div');
  const bestTime = document.createElement('div');

  header.className = 'header';
  title.className = 'title';
  authentication.className = 'authentication';
  authenticationIcon.className = 'authentication__icon';
  authenticationName.className = 'authentication__name';
  scoresContainer.className = 'scores-container';
  score.className = 'score';
  bestScore.className = 'best-score';
  timesContainer.className = 'times-container';
  time.className = 'time';
  bestTime.className = 'best-time';

  container.append(header);
  header.append(title);
  header.append(authentication);
  authentication.append(authenticationIcon);
  authentication.append(authenticationName);
  header.append(scoresContainer);
  scoresContainer.append(score);
  scoresContainer.append(bestScore);

  header.append(timesContainer);
  timesContainer.append(time);
  timesContainer.append(bestTime);

  title.textContent = '2048';
  authenticationName.innerHTML = `Hallo, <span>Anonymous</span>!`;
  score.textContent = '0';
  bestScore.textContent = '0';

  time.textContent = '00:00:00';
  bestTime.textContent = '00:00:00';

  timeGame.timePlayBlock = time;
  timeGame.timeBestPlayBlock = bestTime;
  scoreGame.scorePlayBlock = score;
  scoreGame.scoreTopPlayBlock = bestScore;
};
