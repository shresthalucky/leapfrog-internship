let Game = {
  'state': {
    'begin': true,
    'inPlay': false,
    'isOver': false,
    'ballStart': true,
    'server': undefined,
    'served': false
  }
}

function renderGame() {
  ctx.clearRect(-500, -500, CANVAS_WIDTH + 500, CANVAS_HEIGHT + 500);
  Game.state.server = player;

  table.draw();
  opponent.position.x = ball.current3dPos.x;
  opponent.drawBat();
  net.draw();
  ball.draw();
  player.drawBat();


  if (Game.state.begin && !Game.state.isOver) {
    if (Game.state.ballStart) {
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


  updateStates();

  requestAnimationFrame(renderGame);
}

// choose ball server and serve the ball
function beginGame() {
  if (ball.checkCollision(Game.state.server)) {
    Game.state.served = true;
    console.log('serve');
    ball.serve(90, 0);
  }
}

// ball inside board conditions
function playGame() {

  if (ball.checkCollision(player)) {
    console.log('ping');
    ball.hit(player, 90, 30, 0);
  }

  if (ball.checkCollision(opponent)) {
    ball.hit(opponent, 90, 30, 0);
    console.log('pong');
  }
}

// update scoreboard and restart
function restartGame() {

}

function updateStates() {

  if (ball.bounceCount === 1) {
    Game.state.ballStart = false;
    Game.state.inPlay = true;
  }

  if (Game.state.inPlay) {
    if (!ball.isBallInside()) {
      console.log('out')
      Game.state.served = false;
      Game.state.inPlay = false;
      Game.state.ballStart = true;
      
      ball.setServePosition(Game.state.server);
    }
  }
}