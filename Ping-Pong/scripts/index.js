const canvas = document.getElementById('main');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const ctx = canvas.getContext('2d');


let animationId;

const table = new Board();
const ball = new Ball(new Position(0, 0, table.z));

function render(){
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  table.draw();
  ball.draw();
  requestAnimationFrame(render);
}

animationId = requestAnimationFrame(render);

console.log(table);
console.log(ball);