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
  const BIRD_X = 10;
  const BIRD_Y = 10;
  const BIRD_WIDTH = 34;
  const BIRD_HEIGHT = 24;
  const flappyBird = new Bird(new Position(BIRD_X, BIRD_Y, BIRD_WIDTH, BIRD_HEIGHT));

  return flappyBird;
}

function generateBottomPipe(pipeHeight, pipeWidth) {
  const pipeY = GROUND_Y - pipeHeight;
  const pipe = new Pipe(new Position(INITIAL_PIPE_X, pipeY, pipeWidth, pipeHeight), 'bottom');

  return pipe;
}

function generateTopPipe(pipeHeight, pipeWidth) {
  const pipeY = 0;
  const pipe = new Pipe(new Position(INITIAL_PIPE_X, pipeY, pipeWidth, pipeHeight), 'top');

  return pipe;
}



function generatePipeCouple() {
  const PIPE_WIDTH = 52;
  let topPipeHeight = Math.floor(Math.random() * (MAX_PIPE_HEIGHT - MIN_PIPE_HEIGHT)) + MIN_PIPE_HEIGHT;
  let bottomPipeHeight = GROUND_Y - (topPipeHeight + PIPE_VERTICAL_SPACE);

  console.log(topPipeHeight + bottomPipeHeight);

  let topPipe = generateTopPipe(topPipeHeight, PIPE_WIDTH);
  let bottomPipe = generateBottomPipe(bottomPipeHeight, PIPE_WIDTH);
  console.log(topPipe, bottomPipe);
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

function play() {
  frame++;
  if (frame < 10) {
    requestAnimationFrame(play);
    return;
  }
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  frame = 0;
  background.draw();
  foreground.draw();
  flappyBird.draw();

  generatePipes();

  for (pipe of pipes) {
    pipe.draw();
    pipe.shift();
  }

  requestAnimationFrame(play);
}

function initController() {
  document.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
      flappyBird.flap();
    }
  });
}