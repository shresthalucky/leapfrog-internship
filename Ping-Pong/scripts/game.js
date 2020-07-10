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

function play () {
  ctx.clearRect(-500, -500, CANVAS_WIDTH + 500, CANVAS_HEIGHT + 500);
  Game.state.server = player;
  
  renderGameElements();
  
  requestAnimationFrame(play);
}

function renderGameElements() {
  
  table.draw();
  opponent.position.x = ball.current3dPos.x;
  opponent.drawBat();
  ball.draw();
  player.drawBat();

  if(Game.state.ballStart) {
    ballService();
  }
  
  opponentReturn();

  if(ball.checkCollision(player) && !Game.state.ballStart) {
    console.log('ping');
    // ball.hit(90, 60, 0);
    // debugger
  }
}

function ballService() {

  if(ball.checkCollision(player)) {
    ball.serve(90, 0);
    // ball.hit(90, 60, 0);
    
  }
}


function opponentReturn() {

  if(ball.checkCollision(opponent)) {
    ball.hit(100, 60, 10);
    console.log('pong');
    Game.state.ballStart = false;
  }

}
