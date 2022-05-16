import '/scss/index.scss';
import {header} from '/js/heading.js';
import {btn} from '/js/btn.js';
import {game} from '/js/game.js';

window.addEventListener('DOMContentLoaded', () => {
	header();
	btn();
	game();
});
