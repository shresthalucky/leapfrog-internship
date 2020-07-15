let Game = {
  'state': {
    'begin': true,
    'inPlay': false,
    'isOver': false,
    'ballStart': true,
    'server': undefined,
    'driver': undefined,
    'served': false,
    'serveSuccess': false,
    'deuce': false
  },
  'service': {
    'change': 2
  },
  'score': {
    'player': 0,
    'opponent': 0
  },
  'batDirection': false
}

function renderGame() {
  ctx.clearRect(-500, -500, CANVAS_WIDTH + 500, CANVAS_HEIGHT + 500);

  table.draw();
  opponent.drawBat();
  net.draw();

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

  if (!Game.state.server) {
    Game.state.server = player;
    Game.state.driver = player;
  }

  ball.setServePosition(Game.state.server);

  if (Game.state.server === player) {
    if (!Game.batDirection) player.movementDirection();

    if (player.batActive && Game.batDirection && ball.checkCollision(player)) {
      player.batActive = false;
      Game.state.served = true;
      // console.log('serve');
      ball.serve(player, 80, player.getHitAngle());
      opponentMovement();
    }
  } else {
    if (ball.checkCollision(opponent)) {
      Game.state.served = true;
      player.batActive = true;
      // console.log('serve');
      ball.serve(opponent, 80, 0);
    }
  }
}

// ball inside board conditions
function hitBall() {

  if (player.batActive && ball.checkCollision(player)) {
    player.batActive = false;
    ball.hit(player, 80, 40, player.getHitAngle());
    Game.state.driver = player;
    console.log('ping');
    opponentMovement();
  }

  if (ball.checkCollision(opponent)) {
    Game.state.serveSuccess = true;
    player.batActive = true;
    ball.hit(opponent, 85, 30, 0);
    Game.state.driver = opponent;
    console.log('pong');
  }
}

function updateStates() {

  if (ball.bounceCount === 1) {
    Game.state.inPlay = true;
  }

  if (net.checkCollision()) {
    ball.bounceBack(Game.state.driver);
    Game.state.inPlay = false;
  }

  if (Game.state.inPlay) {
    if (!ball.isBallInside()) {
      console.log('out');
      updateScore();
      Game.state.served = false;
      Game.state.inPlay = false;
      Game.batDirection = false;
      Game.state.serveSuccess = false;
      player.batActive = true;
    }
  }
}

function updateScore() {

  let bounce = `${player.bounce}${opponent.bounce}`;

  // console.log(bounce);

  if (Game.state.serveSuccess) {
    if (Game.state.driver === player) {
      if (bounce === '01') {
        Game.score.player++;
      } else {
        Game.score.opponent++;
      }
    } else if (Game.state.driver === opponent) {
      if (bounce === '10') {
        Game.score.opponent++;
      } else {
        Game.score.player++;
      }
    }
  } else {
    if (Game.state.server === player) {
      if (bounce === '11') {
        Game.score.player++;
      } else {
        Game.score.opponent++;
      }
    } else if (Game.state.server === opponent) {
      if (bounce === '11') {
        Game.score.opponent++;
      } else {
        Game.score.player++;
      }
    }
  }

  checkWin();

  if (Game.score.player === 10 && Game.score.opponent === 10) {
    deuce();
  }

  let points = Game.score.player + Game.score.opponent;

  if (points % Game.service.change === 0) {
    const side = Game.state.server === player ? opponent : player;
    Game.state.server = side;
    Game.state.driver = side;
  }

  console.log(Game.score);
}

function checkWin() {
  if (!Game.state.deuce) {

    if (Game.score.player === 11) gameOver(player);
    if (Game.score.opponent === 11) gameOver(opponent);

  } else {

    const dPoints = Game.score.player - Game.score.opponent;
    if (Math.abs(dPoints) === 2) {
      const winner = dPoints > 0 ? player : opponent;
      gameOver(winner);
    }
  }
}

function deuce() {
  console.log('deuce');
  Game.state.deuce = true;
  Game.service.change = 1;
}

function gameOver(winner) {
  Game.state.isOver = true;
  Game.state.inPlay = false;
  console.log('over', Game.score);
}

function opponentMovement() {
  let pos = ball.current3dPos;
  let slope = ball.velocity.z * TIME / (10 * ball.velocity.x);
  let destination = new Position(pos.x + ((BOARD_END - pos.z) / slope), opponent.position.y, BOARD_END);

  let right = table.surface3d.outer[1].x;
  let left = table.surface3d.outer[0].x;

  if (destination.x < left) {
    destination.x = left;
    let z = (slope * (left - pos.x)) + pos.z;
    destination.z = z > NET_Z + 20 ? z : destination.z;
  } else if (destination.x > right) {
    destination.x = right;
    let z = (slope * (right - pos.x)) + pos.z;
    destination.z = z > NET_Z + 20 ? z : destination.z;
  }

  opponent.animate(destination);
}