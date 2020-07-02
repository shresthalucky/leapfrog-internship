// Create and return background
function initBackground() {
  const BACKGROUND_START_X = 0;
  const BACKGROUND_START_Y = 0;
  const BACKGROUND_WIDTH = 288;
  const BACKGROUND_HEIGHT = GROUND_Y;
  const background = new Background(new Position(BACKGROUND_START_X, BACKGROUND_START_Y, BACKGROUND_WIDTH, BACKGROUND_HEIGHT));

  return background;
}

// Create and return foreground
function initForeground() {
  const FOREGROUND_START_X = 0;
  const FOREGROUND_START_Y = GROUND_Y;
  const FOREGROUND_WIDTH = 288;
  const FOREGROUND_HEIGHT = 112;
  const foreground = new Foreground(new Position(FOREGROUND_START_X, FOREGROUND_START_Y, FOREGROUND_WIDTH, FOREGROUND_HEIGHT));

  return foreground;
}

// Create and return bird
function initBird() {
  const BIRD_X = 40;
  const BIRD_Y = CANVAS_WIDTH / 2;
  const BIRD_WIDTH = 34;
  const BIRD_HEIGHT = 24;
  const flappyBird = new Bird(new Position(BIRD_X, BIRD_Y, BIRD_WIDTH, BIRD_HEIGHT));

  return flappyBird;
}

/**
 * Generate bottom pipe
 * @param {Integer} pipeHeight - height of bottom pipe
 * @param {Integer} pipeWidth - width of bottom pipe
 * @returns {Pipe} - generated bottom pipe object
 */
function generateBottomPipe(pipeHeight, pipeWidth) {
  const pipeY = GROUND_Y - pipeHeight;
  const pipe = new Pipe(new Position(INITIAL_PIPE_X, pipeY, pipeWidth, pipeHeight), 'bottom', true);

  return pipe;
}

/**
 * Generate bottom pipe
 * @param {Integer} pipeHeight - height of top pipe
 * @param {Integer} pipeWidth - width of top pipe
 * @returns {Pipe} - generated top pipe object
 */
function generateTopPipe(pipeHeight, pipeWidth) {
  const pipeY = 0;
  const pipe = new Pipe(new Position(INITIAL_PIPE_X, pipeY, pipeWidth, pipeHeight), 'top', false);

  return pipe;
}

/**
 * Generate top and bottom pipe once
 */
function generatePipeCouple() {
  const PIPE_WIDTH = 52;

  // Calcute required height for top and bottom pipes
  let topPipeHeight = Math.floor(Math.random() * (MAX_PIPE_HEIGHT - MIN_PIPE_HEIGHT)) + MIN_PIPE_HEIGHT;
  let bottomPipeHeight = GROUND_Y - (topPipeHeight + PIPE_VERTICAL_SPACE);

  // Generate top and bottom pipes
  let topPipe = generateTopPipe(topPipeHeight, PIPE_WIDTH);
  let bottomPipe = generateBottomPipe(bottomPipeHeight, PIPE_WIDTH);

  // Add generated pipes to array
  pipes.push(topPipe);
  pipes.push(bottomPipe);
}

/**
 * Generate top and bottom pipes periodically
 */
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

/**
 * Control the movement and collision bird on of pipes
 */
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

/**
 * Recursively called function for animation
 */
function play() {
  if (!game.over) {
    // if game state is playing

    frame++;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // clear canvas

    background.draw(); // draw background on canvas
    foreground.draw(); // draw foreground on canvas
    flappyBird.draw(); // draw bird on canvas

    pipesController();
    flappyBird.groundCheck(); // check for ground collision

    updateScore();
    requestAnimationFrame(play);

  } else {
    // if game state is over

    cancelAnimationFrame(rafId);
    gameOver();
  }

}

/**
 * Control the key press
 */
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

/**
 * Show current score and highscore
 */
function gameOver() {
  game.over = true;

  // Get position of scoreboard and gameover image in sprite
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

  // Draw scoreboard on canvas
  ctx.drawImage(sprite,
    image.scoreboard.sx,
    image.scoreboard.sy,
    image.scoreboard.sw,
    image.scoreboard.sh,
    (CANVAS_WIDTH - image.scoreboard.sw) / 2,
    (CANVAS_HEIGHT - image.scoreboard.sh) / 2,
    image.scoreboard.sw,
    image.scoreboard.sh);

  // Draw gameover on canvas
  ctx.drawImage(sprite,
    image.gameover.sx,
    image.gameover.sy,
    image.gameover.sw,
    image.gameover.sh,
    (CANVAS_WIDTH - image.gameover.sw) / 2,
    ((CANVAS_HEIGHT - image.scoreboard.sh) / 2) / 2,
    image.gameover.sw,
    image.gameover.sh);

  // Save highscore to local storage
  localStorage.setItem('birdhighscore', score.highscore);

  // Draw score to canvas
  ctx.font = 'bold 20px Arial';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 4;
  ctx.strokeText(score.current, CANVAS_WIDTH - 80, (CANVAS_HEIGHT - image.scoreboard.sh) / 2 + 50);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(score.current, CANVAS_WIDTH - 80, (CANVAS_HEIGHT - image.scoreboard.sh) / 2 + 50);

  ctx.font = 'bold 20px Arial';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 4;
  ctx.strokeText(score.highscore, CANVAS_WIDTH - 80, (CANVAS_HEIGHT - image.scoreboard.sh) / 2 + 90);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(score.highscore, CANVAS_WIDTH - 80, (CANVAS_HEIGHT - image.scoreboard.sh) / 2 + 90);
}

/**
 * Update score and draw on top of canvas
 */
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