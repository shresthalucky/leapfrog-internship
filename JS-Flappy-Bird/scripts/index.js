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
const MAX_PIPE_HEIGHT = 320;
const PIPE_HORIZONTAL_SPACE = PIPE_VERTICAL_SPACE * 2;

let rafId;
let background;
let foreground;
let flappyBird;
let frame = 0;

let game = {
  'start': false,
  'over': false
}

let score = {
  'current': 0,
  'highscore': localStorage.getItem('highscore') | 0
}

let pipes = [];

let sprite = new Image();
sprite.src = 'assets/sprite.png';

sprite.onload = function () {

  background = initBackground();
  background.draw();
  foreground = initForeground();
  foreground.draw();
  flappyBird = initBird();
  welcomeScreen();

}

function welcomeScreen() {
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

  ctx.drawImage(sprite,
    image.logo.sx,
    image.logo.sy,
    image.logo.sw,
    image.logo.sh,
    (CANVAS_WIDTH - image.logo.sw) / 2,
    (CANVAS_HEIGHT - image.logo.sh) / 2 - image.logo.sh,
    image.logo.sw,
    image.logo.sh);

  let playX = (CANVAS_WIDTH - image.play.sw) / 2;
  let playY = (CANVAS_HEIGHT - image.play.sh) / 2 + image.play.sh;

  ctx.drawImage(sprite,
    image.play.sx,
    image.play.sy,
    image.play.sw,
    image.play.sh,
    playX,
    playY,
    image.play.sw,
    image.play.sh);

  let playEvent = canvas.addEventListener('click', function (event) {
    let x = event.clientX;
    let y = event.clientY;

    if (x >= playX && x <= playX + image.play.sw && y >= playY && y <= playY + image.play.sh) {
      canvas.removeEventListener('click', playEvent, false);
      initController();
      rafId = requestAnimationFrame(play);
    }

  });
}