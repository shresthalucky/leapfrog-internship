const canvas = document.getElementById('main');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const ctx = canvas.getContext('2d');

let animationId;
const halfCanvasWidth = CANVAS_WIDTH / 2;

let table;
let ball;
let player;

function init() {
  projection.camera.position.x = halfCanvasWidth;
  projection.viewplane.x = halfCanvasWidth;
  
  const ballStartPosition = new Position(halfCanvasWidth, BOARD_Y - BALL_START_HEIGHT, BOARD_Z);
  const playerPosition = new Position(0, BOARD_Y - BALL_START_HEIGHT, PLAYER_POSITION);
  
  table = new Board();
  ball = new Ball(ballStartPosition);
  player = new Player(playerPosition);

  console.log(table);
  console.log(ball);
  console.log(player);

  table.draw();

  initEvents();

  animationId = requestAnimationFrame(play);
}

function initEvents() {
  document.addEventListener('mousemove', function(e) {
    player.handleBatMovement(e);
  })
}

init();