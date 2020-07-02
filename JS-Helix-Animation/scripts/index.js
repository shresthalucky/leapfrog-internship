const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const ROWS = 10;
const COLS = 15;

const OFFSET = 10;

let w = 2 * Math.PI / 500;
let amplitude = 50;

function helix(time) {
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#043a4a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = ROWS + OFFSET; i > OFFSET; i--) {
    for (let j = COLS + OFFSET; j > OFFSET; j--) {

      let x = (20 * j);
      let shm = Math.sin(x * w + time / 1000 + 50) * amplitude;
      let y = (20 * i) + shm;
      
      ctx.beginPath();
      ctx.arc(x, y, (50 + shm) / 12, 0, 360);
      ctx.fillStyle = 'rgb(254, 165, 235)';
      ctx.fill();
      ctx.closePath();
    
    }
  }

  for (let i = ROWS + OFFSET; i > OFFSET; i--) {
    for (let j = COLS + OFFSET; j > OFFSET; j--) {
      
      let x = (20 * j);
      let shm = Math.cos(x * w + time / 1000) * amplitude;
      let y = (20 * i) + shm;
      
      ctx.beginPath();
      ctx.arc(x, y, (50 + shm) / 12, 0, 360);
      ctx.fillStyle = 'rgb(254, 235, 124)';
      ctx.fill();
      ctx.closePath();
    
    }
  }

  requestAnimationFrame(helix);
}

requestAnimationFrame(helix);