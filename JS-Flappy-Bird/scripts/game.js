function initBackground() {
  const BACKGROUND_START_X = 0;
  const BACKGROUND_START_Y = 0;
  const BACKGROUND_WIDTH = 288;
  const BACKGROUND_HEIGHT = GROUND_Y;
  const background = new Background(new Position(BACKGROUND_START_X, BACKGROUND_START_Y, BACKGROUND_WIDTH, BACKGROUND_HEIGHT));

  return background;
}

function initForeground() {
  const FOREGROUND_START_X = 0;
  const FOREGROUND_START_Y = GROUND_Y;
  const FOREGROUND_WIDTH = 288;
  const FOREGROUND_HEIGHT = 112;
  const foreground = new Foreground(new Position(FOREGROUND_START_X, FOREGROUND_START_Y, FOREGROUND_WIDTH, FOREGROUND_HEIGHT));

  return foreground;
}

function initBird() {
  const BIRD_X = 40;
  const BIRD_Y = CANVAS_WIDTH / 2;
  const BIRD_WIDTH = 34;
  const BIRD_HEIGHT = 24;
  const flappyBird = new Bird(new Position(BIRD_X, BIRD_Y, BIRD_WIDTH, BIRD_HEIGHT));

  return flappyBird;
}

function generateBottomPipe(pipeHeight, pipeWidth) {
  const pipeY = GROUND_Y - pipeHeight;
  const pipe = new Pipe(new Position(INITIAL_PIPE_X, pipeY, pipeWidth, pipeHeight), 'bottom', true);

  return pipe;
}

function generateTopPipe(pipeHeight, pipeWidth) {
  const pipeY = 0;
  const pipe = new Pipe(new Position(INITIAL_PIPE_X, pipeY, pipeWidth, pipeHeight), 'top', false);

  return pipe;
}

function generatePipeCouple() {
  const PIPE_WIDTH = 52;
  let topPipeHeight = Math.floor(Math.random() * (MAX_PIPE_HEIGHT - MIN_PIPE_HEIGHT)) + MIN_PIPE_HEIGHT;
  let bottomPipeHeight = GROUND_Y - (topPipeHeight + PIPE_VERTICAL_SPACE);

  let topPipe = generateTopPipe(topPipeHeight, PIPE_WIDTH);
  let bottomPipe = generateBottomPipe(bottomPipeHeight, PIPE_WIDTH);

  pipes.push(topPipe);
  pipes.push(bottomPipe);
}

function generatePipes() {
  if (pipes.length > 0) {
    let lastPipe = pipes[pipes.length - 1];
    let pipesHorizontalSpace = CANVAS_WIDTH - lastPipe.position.coordinates.bottom.x;

    if (pipesHorizontalSpace > PIPE_HORIZONTAL_SPACE) {
      generatePipeCouple();
    }
  } else {
    generatePipeCouple();
  }
}

function pipesController() {
  generatePipes();
  for (pipe of pipes) {
    if (pipe.active) {
      pipe.draw();
      pipe.shift();
      pipe.checkCollision();
    }
  }
}

function play() {
  if (!game.over) {
    frame++;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    background.draw();
    foreground.draw();
    flappyBird.draw();
    pipesController();
    flappyBird.groundCheck();
    updateScore();
    requestAnimationFrame(play);
  } else {
    cancelAnimationFrame(rafId);
    gameOver();
  }

}

function initController() {

  let keyDown = false;

  document.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
      if (keyDown) return;
      keyDown = true;
      flappyBird.flap();
    }
  });

  document.addEventListener('keyup', function (event) {
    if (event.key === ' ') {
      keyDown = false;
    }
  });
}

function gameOver() {
  game.over = true;

  let image = {
    'scoreboard': {
      'sx': 6,
      'sy': 518,
      'sw': 226,
      'sh': 114
    },
    'gameover': {
      'sx': 790,
      'sy': 118,
      'sw': 192,
      'sh': 42
    }
  }

  ctx.drawImage(sprite,
    image.scoreboard.sx,
    image.scoreboard.sy,
    image.scoreboard.sw,
    image.scoreboard.sh,
    (CANVAS_WIDTH - image.scoreboard.sw) / 2,
    (CANVAS_HEIGHT - image.scoreboard.sh) / 2,
    image.scoreboard.sw,
    image.scoreboard.sh);

  ctx.drawImage(sprite,
    image.gameover.sx,
    image.gameover.sy,
    image.gameover.sw,
    image.gameover.sh,
    (CANVAS_WIDTH - image.gameover.sw) / 2,
    ((CANVAS_HEIGHT - image.scoreboard.sh) / 2) / 2,
    image.gameover.sw,
    image.gameover.sh);


  localStorage.setItem('highscore', score.highscore);

  ctx.font = 'bold 20px Arial';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 4;
  ctx.strokeText(score.current, CANVAS_WIDTH - 80, (CANVAS_HEIGHT - image.scoreboard.sh) / 2 + 50);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(score.current, CANVAS_WIDTH - 80, (CANVAS_HEIGHT - image.scoreboard.sh) / 2 + 50);

  ctx.font = 'bold 20px Arial';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 4;
  ctx.strokeText(score.current, CANVAS_WIDTH - 80, (CANVAS_HEIGHT - image.scoreboard.sh) / 2 + 90);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(score.current, CANVAS_WIDTH - 80, (CANVAS_HEIGHT - image.scoreboard.sh) / 2 + 90);
}

function updateScore() {

  if (score.highscore < score.current) {
    score.highscore = score.current;
  }

  ctx.font = 'bold 50px Arial';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 6;
  ctx.strokeText(score.current, CANVAS_WIDTH / 2 - 20, 50);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(score.current, CANVAS_WIDTH / 2 - 20, 50);
}