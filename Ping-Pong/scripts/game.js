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

function renderGame() {
  ctx.clearRect(-500, -500, CANVAS_WIDTH + 500, CANVAS_HEIGHT + 500);

  floor.draw();
  walls.draw();
  scoreboard.draw();
  opponent.draw();

  if(Math.abs(ball.current3dPos.y) < -BOARD_Y) {
    ball.draw();
    table.draw();
    net.draw();
  } else {
    table.draw();
    net.draw();
    ball.draw();
  }

  if (Game.state.begin && !Game.state.isOver) {
    player.setInitialX();
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

  animationId = requestAnimationFrame(renderGame);
}

// choose ball server and serve the ball
function serveBall() {

  if (scoreboard.state.server === player) {
  
    const x = clamp(BOARD_LEFT_X + BALL_MAX_RADIUS, BOARD_RIGHT_X - BALL_MAX_RADIUS, player.position.x);
    ball.setPosition(new Position(x, player.position.y, BOARD_Z));

    if (!Game.batDirection) player.movementDirection();

    if (player.batActive && Game.batDirection && ball.checkCollision(player)) {
      batHit.play();
      player.serve(VELOCITY);
      opponentMovement();
      Game.state.served = true;
      player.batActive = false;
    }
  } else {
    batHit.play();
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
    batHit.play();
    Game.state.serveSuccess = true;
    player.batActive = false;
    ball.hit(player, 80, 30, player.getHitAngle());
    scoreboard.state.driver = player;
    console.log('ping');
    opponentMovement();
  }

  if (opponent.batActive && ball.checkCollision(opponent)) {
    batHit.play();
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

function gameOver() {
  Game.state.inPlay = false;
  scoreboard.resetState();
  scoreboard.allOver(endGame);
}

function endGame(player) {

  cancelAnimationFrame(animationId);

  Game.state.isOver = true;
  Game.state.inPlay = false;
  Game.state.begin = false;

  const playAgainBtn = document.createElement('button');
  const winText = '<div class="row"><h1>'+ player + ' WINS!' +'</h1></div>';
  const content = infoElement.querySelector('.content');

  playAgainBtn.classList.add('btn');
  playAgainBtn.innerText = 'NEW GAME';
  content.innerHTML = innerHTML = winText;
  content.appendChild(playAgainBtn)
  layoutElement.style.display = 'block';
  infoElement.style.display = 'table';

  playAgainBtn.addEventListener('click', ()=> {
    resetGame();
    run();
  });
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