let Game = {
  'state': {
    'start': false,
    'inPlay': false,
    'isOver': true,
    'service': undefined,
    'served': false
  }
}

function play () {
  ctx.clearRect(-500, -500, CANVAS_WIDTH + 500, CANVAS_HEIGHT + 500);
  Game.state.service = player;
  
  renderGameElements();
  
  requestAnimationFrame(play);
}

function renderGameElements() {
  
  table.draw();
  ball.draw();
  player.drawBat();
  if(ball.ballHit(player)) {
    ball.serve(90, 0);
  }
}

