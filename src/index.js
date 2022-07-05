'use strict';

import '/scss/index.scss';
import {createLayoutHeaderBlock} from './js/layout/layoutHeader.js';
import {createLayoutControlBlock} from './js/layout/layoutControl.js';
import {createLayoutGameBlock} from './js/layout/layoutGame.js';
import {createLayoutTableBlock} from './js/layout/layoutTable.js';

import {launchGame} from '/js/game.js';

window.addEventListener('DOMContentLoaded', () => {
  createLayoutHeaderBlock();
  createLayoutControlBlock();
  createLayoutGameBlock();
  createLayoutTableBlock();

  launchGame();
});
