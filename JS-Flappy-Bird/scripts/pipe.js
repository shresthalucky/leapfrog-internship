class Pipe {
  constructor(position, state, bottom) {
    this.position = position;
    this.state = state;
    this.sx;
    this.active = true;
    this.speed = 2;
    this.passed = false;
    this.bottom = bottom;

    if (this.state === 'top') {
      this.sy = Pipe.sprite.top.by - this.position.height;
    } else if (this.state === 'bottom') {
      this.sy = Pipe.sprite.bottom.sy;
    }
  }

  draw = () => {
    ctx.drawImage(sprite,
      Pipe.sprite[this.state].sx,
      this.sy,
      Pipe.sprite[this.state].sw,
      this.position.height,
      this.position.coordinates.top.x,
      this.position.coordinates.top.y,
      this.position.width,
      this.position.height);
  }

  shift = () => {
    this.position.coordinates.top.x -= this.speed;
    this.position.coordinates.bottom.x -= this.speed;
    this.updateScore();
    this.deactivate();
  }

  deactivate = () => {
    if (this.position.coordinates.bottom.x < 0) {
      this.active = false;
    }
  }

  updateScore = () => {
    if (this.position.coordinates.top.x + this.position.width / 2 < flappyBird.position.startX
      && !this.passed
      && this.bottom
    ) {
      score.current++;
      this.passed = true;
    }
  }

  checkCollision = () => {
    if (this.position.coordinates.top.x < flappyBird.position.coordinates.bottom.x
      && this.position.coordinates.bottom.x > flappyBird.position.coordinates.top.x
      && this.position.coordinates.top.y < flappyBird.position.coordinates.bottom.y
      && this.position.coordinates.bottom.y > flappyBird.position.coordinates.top.y) {
      game.over = true;
    }
  }

}

Pipe.sprite = {
  'top': {
    'sx': 112,
    'sy': 646,
    'sw': 52,
    'sh': 320,
    'by': 966
  },
  'bottom': {
    'sx': 168,
    'sy': 646,
    'sw': 52,
    'sh': 320
  }
}