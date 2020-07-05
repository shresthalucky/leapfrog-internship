const canvas = document.getElementById('main');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const ctx = canvas.getContext('2d');

const table = new Board();
table.draw();

console.log(table);