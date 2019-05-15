import _ from '../node_modules/loadsh/index';


document.body.innerHTML = `<canvas width="360px" height="520px" id="myCanvas"></canvas>`


import Game from './js/Game';

window.game = new Game('myCanvas');

