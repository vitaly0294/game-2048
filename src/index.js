import '/scss/index.scss';
import {layoutHeader} from './js/layout/layoutHeader.js';
import {layoutControl} from './js/layout/layoutControl.js';
import {layoutGame} from './js/layout/layoutGame.js';
import {layoutTable} from './js/layout/layoutTable.js';

import {game} from '/js/game.js';

window.addEventListener('DOMContentLoaded', () => {
	layoutHeader();
	layoutControl();
	layoutGame();
	layoutTable();

	game();
});
