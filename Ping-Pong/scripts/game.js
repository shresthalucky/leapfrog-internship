let Game = {
  'state': {
    'begin': true,
    'inPlay': false,
    'isOver': false,
    'ballStart': true,
    'served': false,
    'serveSuccess': false,
  },
  'batDirection': false
}

function renderGame() {
  ctx.clearRect(-500, -500, CANVAS_WIDTH + 500, CANVAS_HEIGHT + 500);

  floor.draw();
  walls.draw();
  table.draw();
  opponent.drawBat();
  net.draw();
  scoreboard.draw();

  if (Game.state.begin && !Game.state.isOver) {
    ball.draw();
    player.setInitialX();
    player.drawBat();

    updateStates();

    if (!Game.state.served) {
      serveBall();
    } else if (Game.state.inPlay) {
      hitBall();
    }
  } else {
    // TODO: start game menu
    // console.log('end');
  }

  requestAnimationFrame(renderGame);
}

// choose ball server and serve the ball
function serveBall() {

  if (scoreboard.state.server === player) {
  
    const x = clamp(BOARD_LEFT_X + BALL_MAX_RADIUS, BOARD_RIGHT_X - BALL_MAX_RADIUS, player.position.x);
    ball.setPosition(new Position(x, player.position.y, BOARD_Z));

    if (!Game.batDirection) player.movementDirection();

    if (player.batActive && Game.batDirection && ball.checkCollision(player)) {
      player.serve(VELOCITY);
      opponentMovement();
      Game.state.served = true;
      player.batActive = false;
    }
  } else {
    const pos = opponent.setPosition();
    ball.setPosition(pos);
    opponent.serve(VELOCITY);
    Game.state.served = true;
    player.batActive = true;
  }

  player.resetBounce();
  opponent.resetBounce();
}


// ball inside board conditions
function hitBall() {

  if (player.batActive && ball.checkCollision(player)) {
    player.batActive = false;
    ball.hit(player, 80, 40, player.getHitAngle());
    scoreboard.state.driver = player;
    console.log('ping');
    opponentMovement();
  }

  if (opponent.batActive && ball.checkCollision(opponent)) {
    Game.state.serveSuccess = true;
    player.batActive = true;
    ball.hit(opponent, 80, 30, 0);
    scoreboard.state.driver = opponent;
    console.log('pong');
  }
}

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
      console.log('out');
      updateScore();
      Game.state.served = false;
      Game.state.inPlay = false;
      Game.batDirection = false;
      Game.state.serveSuccess = false;
      player.batActive = true;
      opponent.batActive = true;
  }
}

function updateScore() {
  scoreboard.updateScore();
  scoreboard.checkWin(gameOver);
  scoreboard.server();
}

function gameOver(winner) {
  Game.state.isOver = true;
  Game.state.inPlay = false;
  console.log('over', scoreboard.scores);
}

function opponentMovement() {
  const pos = ball.current3dPos;
  const slope = ball.velocity.z * TIME / (10 * ball.velocity.x);
  const destination = new Position(pos.x + ((BOARD_END - pos.z) / slope), opponent.position.y, BOARD_END);

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