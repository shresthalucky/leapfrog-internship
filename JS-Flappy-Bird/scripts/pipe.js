class Pipe {
  constructor(position, state) {
    this.position = position;
    this.state = state;
    this.sx;

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
      this.position.startX,
      this.position.startY,
      this.position.width,
      this.position.height);
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