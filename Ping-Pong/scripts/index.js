const canvas = document.getElementById('main');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const ctx = canvas.getContext('2d');

let animationId;
const halfCanvasWidth = canvasWidth / 2;

projection.camera.position.x = halfCanvasWidth;
projection.viewplane.x = halfCanvasWidth;


// persective sideview
// projection.camera.position.x = -100;
// projection.camera.position.y = -100;
// projection.camera.position.z = 1060;
// projection.camera.orientation.thetaY = 90 * Math.PI/180;
// ctx.translate(0, canvasHeight/2);

const table = new Board();
const ball = new Ball(new Position(halfCanvasWidth, -16, table.z));

table.draw();
ball.draw();

function render(){
  ctx.clearRect(-500, -500, canvasWidth + 500, canvasHeight + 500);
  table.draw();
  ball.bounce();

  requestAnimationFrame(render);
}

animationId = requestAnimationFrame(render);


console.log(table);
console.log(ball);