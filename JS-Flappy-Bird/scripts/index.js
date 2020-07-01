const canvas = document.getElementById('game');

canvas.height = 624;
canvas.width = 288;

const CANVAS_HEIGHT = canvas.height;
const CANVAS_WIDTH = canvas.width;
const ctx = canvas.getContext('2d');

const GROUND_Y = 512;
const INITIAL_PIPE_X = CANVAS_WIDTH - 60;
const MIN_PIPE_HEIGHT = 50;
const MAX_PIPE_HEIGHT = 320;

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

  generatePipes();

  initController();

  rafId = requestAnimationFrame(play);
}