import '/scss/index.scss';
import {header} from '/js/heading.js';
import {resBtn} from '/js/resBtn.js';
import {game} from '/js/game.js';

window.addEventListener('DOMContentLoaded', () => {
	header();
	resBtn();
	game();
});
