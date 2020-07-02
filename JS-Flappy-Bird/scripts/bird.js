class Bird {
  constructor(position) {
    this.position = position;
    this.flapLoop = [Bird.sprite.flap1, Bird.sprite.flap2, Bird.sprite.flap3]
    this.flapLoopIndex = 0;
    this.gravity = 0.1;
    this.thrust = 40;
    this.speed = 0;
  }

  draw = () => {
    if (frame % 10 === 0) {
      this.flapLoopIndex++;
      this.flapLoopIndex %= this.flapLoop.length;
    }

    let flapPos = this.flapLoop[this.flapLoopIndex];

    ctx.drawImage(sprite,
      flapPos.sx,
      flapPos.sy,
      flapPos.sw,
      flapPos.sh,
      this.position.coordinates.top.x,
      this.position.coordinates.top.y,
      this.position.width,
      this.position.height);

    this.speed += this.gravity;
    this.position.coordinates.top.y += this.speed;
    this.position.coordinates.bottom.y += this.speed;

  }

  flap = () => {
    if (this.position.coordinates.top.y > 0) {
      this.speed = 0;
      this.position.coordinates.top.y -= this.thrust;
      this.position.coordinates.bottom.y -= this.thrust;
    }
  }

  groundCheck = () => {
    if (this.position.coordinates.bottom.y >= GROUND_Y) {
      game.over = true;
    }
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