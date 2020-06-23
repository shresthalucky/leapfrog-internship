var body = document.body;
var playground = document.createElement('div');
var ball = document.createElement('div');
var ballTopPosition = 0;
var speed = 10; // move 10px per frame
var bounceHeight;

function drawPlayground(height, width) {
  playground.className = 'playground';
  playground.style.position = 'relative';
  playground.style.height = height + 'px';
  playground.style.width = height + 'px';
  playground.style.border = '1px solid #999999';
  body.appendChild(playground);
}

function drawBall(diameter) {
  var css = 'position: absolute; '
    + 'height: ' + diameter + 'px; '
    + 'width: ' + diameter + 'px; '
    + 'background-color: #4499cb; '
    + 'border-radius: 50%; '
    + 'left: 50%; '
    + 'top: 0; '
    + 'transform: translate(-50%); ';

  ball.style.cssText = css;
  playground.appendChild(ball);
  bounceHeight = parseInt(playground.style.height) - diameter;
}

function bounce() {
  ballTopPosition = parseInt(ball.style.top);
  ballTopPosition += speed
  ball.style.top = ballTopPosition + 'px';

  if (ballTopPosition <= 0 || ballTopPosition >= bounceHeight) {
    speed *= -1;
  }
  window.requestAnimationFrame(bounce);
}

drawPlayground(500, 500); // make playground of height and width 500px
drawBall(50); // make ball of 50px diameter
window.requestAnimationFrame(bounce); // start animation