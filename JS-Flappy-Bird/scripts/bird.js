class Bird {
  constructor(position) {
    this.position = position;
    this.flapLoop = [Bird.sprite.flap1, Bird.sprite.flap2, Bird.sprite.flap3]
    this.flapLoopIndex = 0;
  }

  draw = () => {
    this.flapLoopIndex %= this.flapLoop.length;
    let flapPos = this.flapLoop[this.flapLoopIndex];
    this.flapLoopIndex++;

    ctx.drawImage(sprite,
      flapPos.sx,
      flapPos.sy,
      flapPos.sw,
      flapPos.sh,
      this.position.startX,
      this.position.startY,
      this.position.width,
      this.position.height);

    // this.position.startY++;
  }

  flap = () => {
    this.position.startY -= 20;
  }

}

Bird.sprite = {
  'flap1': {
    'sx': 6,
    'sy': 982,
    'sw': 34,
    'sh': 24
  },
  'flap2': {
    'sx': 62,
    'sy': 982,
    'sw': 34,
    'sh': 24
  },
  'flap3': {
    'sx': 118,
    'sy': 982,
    'sw': 34,
    'sh': 24
  }
}