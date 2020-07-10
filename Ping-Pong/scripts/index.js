const canvas = document.getElementById('main');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const ctx = canvas.getContext('2d');

const BALL_START_HEIGHT = 120; // vertical height from the board

let animationId;
const halfCanvasWidth = canvasWidth / 2;

projection.camera.position.x = halfCanvasWidth;
projection.viewplane.x = halfCanvasWidth;

const table = new Board();
const ballStartPosition = new Position(halfCanvasWidth, table.y - BALL_START_HEIGHT, table.z);
const ball = new Ball(ballStartPosition);

const playerPosition = new Position(0, table.y - BALL_START_HEIGHT, table.z - 100);
const player = new Player(playerPosition);

// console.log(ballStartPosition)

// ctx.translate(0, canvasWidth/2);

ball.playerToServe = player;

table.draw();

console.log(table);
console.log(ball);
console.log(player);

function render() {
  ctx.clearRect(-500, -500, canvasWidth + 500, canvasHeight + 500);
  table.draw();
  ball.draw();
  player.drawBat();
  if(ball.ballHit(player)) {
    ball.serve(90, 0);
  }
  requestAnimationFrame(render);
}

animationId = requestAnimationFrame(render);


document.addEventListener('mousemove', function(e) {
  player.handleBatMovement(e);
})

