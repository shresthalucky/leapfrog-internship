class Background {
  constructor(position) {
    this.position = position;
  }

  draw = () => {
    ctx.drawImage(sprite,
      Background.sprite.sx,
      Background.sprite.sy,
      Background.sprite.sw,
      Background.sprite.sh,
      this.position.coordinates.top.x,
      this.position.coordinates.top.y,
      this.position.width,
      this.position.height);

    ctx.drawImage(sprite,
      Background.sprite.sx,
      Background.sprite.sy,
      Background.sprite.sw,
      Background.sprite.sh,
      this.position.width + this.position.coordinates.top.x,
      this.position.coordinates.top.y,
      this.position.width,
      this.position.height);

    this.position.coordinates.top.x -= 0.5;

    if (this.position.coordinates.top.x < -this.position.width) {
      this.position.coordinates.top.x = 0;
    }
  }
}

class Foreground {
  constructor(position) {
    this.position = position;
  }

  draw = () => {
    ctx.drawImage(sprite,
      Foreground.sprite.sx,
      Foreground.sprite.sy,
      Foreground.sprite.sw,
      Foreground.sprite.sh,
      this.position.coordinates.top.x,
      this.position.coordinates.top.y,
      this.position.width,
      this.position.height);

    ctx.drawImage(sprite,
      Foreground.sprite.sx,
      Foreground.sprite.sy,
      Foreground.sprite.sw,
      Foreground.sprite.sh,
      this.position.width + this.position.coordinates.top.x,
      this.position.coordinates.top.y,
      this.position.width,
      this.position.height);

    this.position.coordinates.top.x -= 3;


    if (this.position.coordinates.top.x < -this.position.width) {
      this.position.coordinates.top.x = 0;
    }
  }
}

Background.sprite = {
  'sx': 0,
  'sy': 0,
  'sw': 288,
  'sh': 512
}

Foreground.sprite = {
  'sx': 584,
  'sy': 0,
  'sw': 336,
  'sh': 112
}