var body = document.body;

var canvas = document.createElement('div');
canvas.className = 'canvas';
canvas.style.position = 'relative';
canvas.style.height = 100 + 'px';
canvas.style.width = 100 + 'px';
canvas.style.border = '1px solid #999999';
body.appendChild(canvas);

function plot(points) {
  var style = 'position: absolute; '
    + 'height: 10px; '
    + 'width: 10px; '
    + 'background-color: #4499cb; '
    + 'border-radius: 50%; ';

  points.forEach(function (point) {
    var dot = document.createElement('div');
    dot.style.cssText = style;
    dot.style.left = point.x + 'px';
    dot.style.top = point.y + 'px';
    canvas.appendChild(dot);
  })
}

var points = [
  { x: 10, y: 20 },
  { x: 40, y: 40 },
  { x: 60, y: 20 },
  { x: 90, y: 20 },
  { x: 60, y: 70 },
];

plot(points);