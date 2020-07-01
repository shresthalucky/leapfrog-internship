class Pipe {
  constructor(position, state) {
    this.position = position;
    this.state = state;
    this.sx;
    this.active = true;

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
    this.position.coordinates.top.x -= 10;
    this.position.coordinates.bottom.x -= 10;
    this.deactivate();
  }

  deactivate = () => {
    if (this.position.coordinates.bottom.x < 0) {
      this.active = false;
    }
  }

  checkCollision = () => {
    if (this.position.coordinates.top.x < flappyBird.position.coordinates.bottom.x
      && this.position.coordinates.bottom.x > flappyBird.position.coordinates.top.x
      && this.position.coordinates.top.y < flappyBird.position.coordinates.bottom.y
      && this.position.coordinates.bottom.y > flappyBird.position.coordinates.top.y) {
      console.log('collide');
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