const canvas = document.getElementById('main');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const ctx = canvas.getContext('2d');

const BALL_START_HEIGHT = 200; // vertical height from the board

let animationId;
const halfCanvasWidth = canvasWidth / 2;

projection.camera.position.x = halfCanvasWidth;
projection.viewplane.x = halfCanvasWidth;

// projection.camera.orientation.thetaX = -10 * Math.PI/180; 


// persective sideview inverted
// projection.camera.position.x = -100;
// projection.camera.position.y = -100;
// projection.camera.position.z = 1060;
// projection.camera.orientation.thetaY = 90 * Math.PI/180;
// ctx.translate(0, canvasHeight/2);

const table = new Board();
const ballStartPosition = new Position(halfCanvasWidth, table.y - BALL_START_HEIGHT, table.z);
const ball = new Ball(ballStartPosition);


const playerPosition = new Position(halfCanvasWidth, table.y - BALL_START_HEIGHT, table.z);
const player = new Player(playerPosition);

// console.log(ballStartPosition)

// ctx.translate(0, canvasWidth/2);

table.draw();
ball.draw();
player.drawBat();

console.log(table);
console.log(ball);
console.log(player);

function render() {
  ctx.clearRect(-500, -500, canvasWidth + 500, canvasHeight + 500);
  table.draw();
  ball.draw();
  // ball.bounce();

  requestAnimationFrame(render);
}

// animationId = requestAnimationFrame(render);


