const canvas = document.getElementById('game');

canvas.height = 624; // set canvas height
canvas.width = 288; // set canvas width

const CANVAS_HEIGHT = canvas.height;
const CANVAS_WIDTH = canvas.width;

const ctx = canvas.getContext('2d');

// constant values for game objects
const GROUND_Y = 512;
const INITIAL_PIPE_X = CANVAS_WIDTH;
const PIPE_VERTICAL_SPACE = 96;
const MIN_PIPE_HEIGHT = 96;
const MAX_PIPE_HEIGHT = 320;
const PIPE_HORIZONTAL_SPACE = PIPE_VERTICAL_SPACE * 2;

// initialize global variables
let rafId;
let background;
let foreground;
let flappyBird;
let frame = 0;

// Create game states
let game = {
  'start': false,
  'over': false
}

let score = {
  'current': 0,
  'highscore': localStorage.getItem('birdhighscore') | 0
}

let pipes = []; // Array to store generated pipes

// Create image object for sprite image
let sprite = new Image();
sprite.src = 'assets/sprite.png';

// Initialize game if sprite is loaded
sprite.onload = function () {
  background = initBackground();
  background.draw();
  foreground = initForeground();
  foreground.draw();
  flappyBird = initBird();
  welcomeScreen();
}

/**
 * Welcome screen with logo and play button
 */
function welcomeScreen() {

  // Get position of logo and play image in sprite
  let image = {
    'logo': {
      'sx': 702,
      'sy': 180,
      'sw': 178,
      'sh': 48
    },
    'play': {
      'sx': 706,
      'sy': 236,
      'sw': 106,
      'sh': 58
    }
  }

  // Draw logo on canvas
  ctx.drawImage(sprite,
    image.logo.sx,
    image.logo.sy,
    image.logo.sw,
    image.logo.sh,
    (CANVAS_WIDTH - image.logo.sw) / 2,
    (CANVAS_HEIGHT - image.logo.sh) / 2 - image.logo.sh,
    image.logo.sw,
    image.logo.sh);

  // Calculate position of play button on canvas
  let playX = (CANVAS_WIDTH - image.play.sw) / 2;
  let playY = (CANVAS_HEIGHT - image.play.sh) / 2 + image.play.sh;

  // Draw play button on canvas
  ctx.drawImage(sprite,
    image.play.sx,
    image.play.sy,
    image.play.sw,
    image.play.sh,
    playX,
    playY,
    image.play.sw,
    image.play.sh);

  // Create event handler to handle play button click
  let playEvent = canvas.addEventListener('click', function (event) {
    let x = event.clientX;
    let y = event.clientY;

    // Initialize Game
    if (x >= playX && x <= playX + image.play.sw && y >= playY && y <= playY + image.play.sh) {
      canvas.removeEventListener('click', playEvent, false);
      initController(); // Initialize Controller
      rafId = requestAnimationFrame(play); // Start animation
    }
  });
}