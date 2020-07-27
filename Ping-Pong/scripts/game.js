let Game = {
  'state': {
    'begin': true,
    'inPlay': false,
    'isOver': false,
    'ballStart': true,
    'served': false,
    'serveSuccess': false,
    'pause': false,
    'ballIn': true
  },
  'batDirection': false
}

// Set Game object to initial state
function resetGame() {
  Game = {
    'state': {
      'begin': true,
      'inPlay': false,
      'isOver': false,
      'ballStart': true,
      'served': false,
      'serveSuccess': false,
      'pause': false,
      'ballIn': true
    },
    'batDirection': false
  };
}

// Draw on canvas sequentially
function drawSequence () {
  if (Math.abs(ball.current3dPos.y) < -BOARD_Y) {
    ball.draw();
    table.draw();
    net.draw();
  } else {
    table.draw();
    net.draw();
    ball.draw();
  }
}

// Perform game loop operations
function renderGame() {
  ctx.clearRect(-500, -500, CANVAS_WIDTH + 500, CANVAS_HEIGHT + 500);

  floor.draw();
  walls.draw();
  scoreboard.draw();

  if(ball.current3dPos.z > opponent.position.z ) {
    drawSequence();
    opponent.draw();
  }else {
    opponent.draw();
    drawSequence();
  }

  if (Game.state.begin && !Game.state.isOver) {
    
    player.draw();
    updateStates();

    if (!Game.state.served) {
      serveBall();
    } else if (Game.state.inPlay) {
      hitBall();
    }
  } else {
    cancelAnimationFrame(animationId);
    return;
  }

  lastFrameTime = performance.now();
  animationId = requestAnimationFrame(renderGame);
}

// Reset player's bounce count
function resetBounceCount() {
  player.resetBounce();
  opponent.resetBounce();
}

// Choose ball server and serve the ball
function serveBall() {

  if (scoreboard.state.server === player) {

    // Limit ball within board
    const x = clamp(BOARD_LEFT_X + BALL_MAX_RADIUS, BOARD_RIGHT_X - BALL_MAX_RADIUS, player.position.x);
    ball.setPosition(new Position(x, player.position.y, BOARD_Z));

    if (!Game.batDirection) player.movementDirection();

    if (player.batActive && Game.batDirection && ball.checkCollision(player)) {
      resetBounceCount();
      batHit.play();
      player.serve();
      opponentMovement();
      Game.state.served = true;
      player.batActive = false;
    }
  } else {
    resetBounceCount();
    const pos = opponent.setPosition();
    ball.setPosition(pos);
    batHit.play();
    opponent.serve(VELOCITY);
    Game.state.served = true;
    player.batActive = true;
  }
}

// Perform driving of ball to opponent's court
function hitBall() {

  if (player.batActive && ball.checkCollision(player)) {
    resetBounceCount();
    batHit.play();
    Game.state.serveSuccess = true;
    player.batActive = false;
    ball.hit(player, ...player.getParameters());
    scoreboard.state.driver = player;
    if (player.foul()) {
      Game.state.inPlay = false;
    }
    opponentMovement();
    return;
  }

  if (opponent.batActive && ball.checkCollision(opponent)) {
    resetBounceCount();
    batHit.play();
    Game.state.serveSuccess = true;
    ball.hit(opponent, VELOCITY, SIDE_ANGLE, UP_ANGLE);
    player.batActive = true;
    scoreboard.state.driver = opponent;
    if (opponent.foul()) {
      Game.state.inPlay = false;
    }
    return;
  }
}

// Update game states with conditions
function updateStates() {

  if (ball.bounceCount === 1) {
    Game.state.inPlay = true;
  }

  if (net.checkCollision()) {
    ball.bounceBack(scoreboard.state.driver);
    Game.state.inPlay = false;
    scoreboard.state.driver.batActive = false;
  }

  if (Game.state.inPlay && ball.ballOut()) {
    updateScore();
    Game.state.served = false;
    Game.state.inPlay = false;
    Game.batDirection = false;
    Game.state.serveSuccess = false;
    player.batActive = true;
    opponent.batActive = true;
  }
}

// Update scoreboard for current game
function updateScore() {
  scoreboard.updateScore();
  scoreboard.checkWin(gameOver);
  scoreboard.server();
}

// Set game states for game over
function gameOver() {
  Game.state.inPlay = false;
  scoreboard.resetState();
  scoreboard.allOver();
}

// Control opponent's bat movement with ball's movement
function opponentMovement() {
  const pos = ball.current3dPos;
  const slope = ball.velocity.z * TIME / (10 * ball.velocity.x);
  const destination = new Position(pos.x + ((BOARD_END - pos.z) / slope), opponent.position.y, BOARD_END + 10);

  const right = BOARD_RIGHT_X;
  const left = BOARD_LEFT_X;

  if (destination.x < left) {
    destination.x = left;

    const z = (slope * (left - pos.x)) + pos.z;
    destination.z = z > NET_Z + BOARD_HALF_LENGTH / 2 ? z : destination.z;

  } else if (destination.x > right) {
    destination.x = right;

    const z = (slope * (right - pos.x)) + pos.z;
    destination.z = z > NET_Z + BOARD_HALF_LENGTH / 2 ? z : destination.z;
  }

  opponent.animate(destination);
}