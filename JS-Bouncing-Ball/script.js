class Playground {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.element = document.createElement('div');
    this.element.className = 'playground';
    this.element.style.position = 'relative';
    this.element.style.height = this.height + 'px';
    this.element.style.width = this.width + 'px';
    this.element.style.border = '2px solid #888';
    this.element.style.float = 'left';
    this.render = this.render.bind(this);
    this.getElement = this.getElement.bind(this);
  }

  render() {
    document.body.appendChild(this.element);
  }

  getElement() {
    return this.element;
  }
}

class Ball {
  constructor(playground, startPosition, color = '#4499cb', speed = 10) {
    this.start = startPosition;
    this.speed = speed;
    this.color = color;
    this.element = document.createElement('div');
    this.element.className = 'ball';
    this.element.style.position = 'absolute';
    this.element.style.height = 50 + 'px';
    this.element.style.width = 50 + 'px';
    this.element.style.backgroundColor = this.color;
    this.element.style.borderRadius = '50%';
    this.element.style.top = '0px';
    this.element.style.left = this.start + 'px';
    this.parentElement = playground.getElement();
    this.render = this.render.bind(this);
    this.bounce = this.bounce.bind(this);
    this.bounceHeight = playground.height - 50;
  }

  render() {
    this.parentElement.appendChild(this.element);
  }

  bounce() {
    let ballTopPosition = parseInt(this.element.style.top);
    ballTopPosition += this.speed;
    this.element.style.top = ballTopPosition + 'px';

    if (ballTopPosition <= 0 || ballTopPosition >= this.bounceHeight) {
      this.speed *= -1;
    }
    window.requestAnimationFrame(this.bounce);
  }
}

for (let i = 500; i > 0; i -= 100) {
  let ground = new Playground(i, 100);
  ground.render();
  let ball = new Ball(ground, 0, `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}`, i / 50);
  ball.render();
  window.requestAnimationFrame(ball.bounce);
}