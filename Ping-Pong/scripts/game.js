let Game = {
  'state': {
    'begin': true,
    'inPlay': false,
    'isOver': false,
    'ballStart': true,
    'server': undefined,
    'driver': undefined,
    'served': false,
  },
  'batDirection': false
}

function renderGame() {
  ctx.clearRect(-500, -500, CANVAS_WIDTH + 500, CANVAS_HEIGHT + 500);

  table.draw();
  opponent.position.x = ball.current3dPos.x;
  opponent.drawBat();
  net.draw();
  ball.draw();
  player.drawBat();

  updateStates();

  if (Game.state.begin && !Game.state.isOver) {
    if (!Game.state.served) {
      beginGame();
    } else {
      if (Game.state.inPlay) {
        playGame();
      } else {
        restartGame();
      }
    }
  } else {
    // TODO: start game menu
  }

  requestAnimationFrame(renderGame);
}

// choose ball server and serve the ball
function beginGame() {

  Game.state.server = player;
  Game.state.driver = player;
  ball.setServePosition(Game.state.server);

  if (!Game.batDirection) player.movementDirection();

  if (Game.batDirection && ball.checkCollision(Game.state.server)) {
    Game.state.served = true;
    console.log('serve');
    ball.serve(80, player.getHitAngle());
  }
}

// ball inside board conditions
function playGame() {

  if (ball.checkCollision(player)) {
    ball.hit(player, 75, 40, player.getHitAngle());
    Game.state.driver = player;
    console.log('ping');
  }

  if (ball.checkCollision(opponent)) {
    ball.hit(opponent, 90, 30, 0);
    Game.state.driver = opponent;
    console.log('pong');
  }

  if (net.checkCollision()) {
    ball.bounceBack(Game.state.driver);
  }

}

// update scoreboard and restart
function restartGame() {

}

function updateStates() {

  if (ball.bounceCount === 1) {
    Game.state.inPlay = true;
  }

  if (Game.state.inPlay) {
    if (!ball.isBallInside()) {
      console.log('out')
      Game.state.served = false;
      Game.state.inPlay = false;
      Game.batDirection = false;
    }
  }
}