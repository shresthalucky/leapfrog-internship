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
projection.camera.position.x = -100;
projection.camera.position.y = -100;
projection.camera.position.z = 1060;
projection.camera.orientation.thetaY = 90 * Math.PI/180;
ctx.translate(0, canvasHeight/2);

const table = new Board();
const ball = new Ball(new Position(halfCanvasWidth, -100, table.z));


// let h = 0;

function render(){
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  table.draw();
  ball.draw();

  // ctx.beginPath();
  // ctx.arc(canvasWidth/2, h, 20, 0, 360);
  // ctx.fillStyle = "#000";
  // ctx.fill();
  // ctx.closePath();
  // h++;
  requestAnimationFrame(render);
}

animationId = requestAnimationFrame(render);


console.log(table);
console.log(ball);