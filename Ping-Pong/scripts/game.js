let Game = {
  'state': {
    'start': false,
    'inPlay': false,
    'isOver': true,
    'ballStart': true,
    'server': undefined,
    'served': false
  }
}

function play() {
  ctx.clearRect(-500, -500, CANVAS_WIDTH + 500, CANVAS_HEIGHT + 500);
  Game.state.server = player;

  drawGameElements();

  requestAnimationFrame(play);
}

function drawGameElements() {

  table.draw();
  opponent.position.x = ball.current3dPos.x;
  opponent.drawBat();
  ball.draw();
  player.drawBat();

  if (Game.state.ballStart) {
    if (ball.checkCollision(player)) {
      ball.serve(90, 0);
    }
  }

  if (ball.checkCollision(player) && !Game.state.ballStart) {
    console.log('ping');
    ball.hit(player, 90, 30, -45);
  }

  if (ball.checkCollision(opponent)) {
    ball.hit(opponent, 90, 30, 45);
    console.log('pong');
    Game.state.ballStart = false;
  }

}