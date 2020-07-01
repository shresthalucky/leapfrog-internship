const canvas = document.getElementById('game');

canvas.height = 624;
canvas.width = 288;

const CANVAS_HEIGHT = canvas.height;
const CANVAS_WIDTH = canvas.width;
const ctx = canvas.getContext('2d');


const GROUND_Y = 512;
const INITIAL_PIPE_X = CANVAS_WIDTH;
const PIPE_VERTICAL_SPACE = 96;
const MIN_PIPE_HEIGHT = 96;
const MAX_PIPE_HEIGHT = (GROUND_Y - PIPE_VERTICAL_SPACE) / 2;
const PIPE_HORIZONTAL_SPACE = PIPE_VERTICAL_SPACE * 2;

const BIRD_X = 10;
const BIRD_Y = 10;

let rafId;
let background;
let foreground;
let flappyBird;
let frame = 0;

let pipes = [];

let sprite = new Image();
sprite.src = 'assets/sprite.png';

sprite.onload = function() {

  background = initBackground();
  foreground = initForeground();
  flappyBird = initBird();

  initController();

  rafId = requestAnimationFrame(play);
}