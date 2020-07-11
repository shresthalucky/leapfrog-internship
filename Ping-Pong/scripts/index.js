const canvas = document.getElementById('main');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const ctx = canvas.getContext('2d');

let animationId;
const halfCanvasWidth = CANVAS_WIDTH / 2;

let table;
let net;
let ball;
let player;
let opponent;

function init() {
  projection.camera.position.x = halfCanvasWidth;
  projection.viewplane.x = halfCanvasWidth;
  
  const ballStartPosition = new Position(halfCanvasWidth, BOARD_Y - BALL_START_HEIGHT, BOARD_Z);
  const playerPosition = new Position(0, BOARD_Y - BALL_START_HEIGHT, PLAYER_Z_POSITION);
  const opponentPosition = new Position(1000, BOARD_Y - BALL_START_HEIGHT, OPPONENT_Z_POSITION);
  
  table = new Board();
  net = new Net();
  ball = new Ball(ballStartPosition);
  player = new Player(playerPosition);
  opponent = new Player(opponentPosition);
  
  console.log(table);
  console.log(net);
  console.log(ball);
  console.log(player);
  console.log(opponent);

  table.draw();
  net.draw();

  initEvents();

  animationId = requestAnimationFrame(renderGame);
}

function initEvents() {
  document.addEventListener('mousemove', function(e) {
    player.handleBatMovement(e);
  })
}

init();