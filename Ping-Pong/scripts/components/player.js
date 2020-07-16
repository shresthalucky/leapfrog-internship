class Player {
  constructor(position) {
    this.position = new Position(position.x, position.y, position.z);
    this.size = {
      'long': BAT_LENGTH,
      'width': BAT_WIDTH
    }
    this.halfSize = {
      'long': this.size.long / 2,
      'width': this.size.width / 2
    }

    this.surface3d;
    this.surface2d;
    // this.batThickness = BAT_THICKNESS;
    this.intialX;
    this.bounce;
    this.batActive = true;
  }

  loadSurface = () => {
    this.surface3d = {
      'topLeft': new Position(this.position.x - this.halfSize.width, this.position.y - this.halfSize.long, this.position.z),
      'topRight': new Position(this.position.x + this.halfSize.width, this.position.y - this.halfSize.long, this.position.z),
      'bottomRight': new Position(this.position.x + this.halfSize.width, this.position.y + this.halfSize.long, this.position.z),
      'bottomLeft': new Position(this.position.x - this.halfSize.width, this.position.y + this.halfSize.long, this.position.z)
    }

    this.surface2d = {
      'topLeft': projection.get2dProjection(this.surface3d.topLeft),
      'topRight': projection.get2dProjection(this.surface3d.topRight),
      'bottomRight': projection.get2dProjection(this.surface3d.bottomRight),
      'bottomLeft': projection.get2dProjection(this.surface3d.bottomLeft)
    }
  }

  drawBat = () => {

    this.loadSurface();

    let width = this.surface2d.topRight.get2dDistance(this.surface2d.topLeft);
    let height = this.surface2d.topLeft.get2dDistance(this.surface2d.bottomLeft);

    // ctx.beginPath();
    // ctx.rect(this.surface2d.topLeft.x, this.surface2d.topLeft.y, width, height);
    // ctx.fillStyle = "#FF0000";
    // ctx.fill();
    // ctx.closePath();

    ctx.save();
    ctx.beginPath();
    ctx.translate(this.surface2d.topLeft.x + width / 2, this.surface2d.topLeft.y + height / 2);
    ctx.rotate(this.getRotationAngle());
    ctx.drawImage(sprite,
      Player.sprite.bat.sx,
      Player.sprite.bat.sy,
      Player.sprite.bat.sw,
      Player.sprite.bat.sh,
      -width / 2,
      -height / 2,
      width,
      height);
    ctx.closePath();
    ctx.restore();
  }

  resetBounce = () => {
    this.bounce = 0;
  }

  getRotationAngle = () => {
    let norm = (HALF_CANVAS_WIDTH - this.position.x) / (BOARD_HALF_WIDTH + BOUNDARY_PADDING);
    let angle = Math.acos(norm) - ENV.toRadian(90);
    return angle;
  }
}

Player.sprite = {
  'bat': {
    'sx': 0,
    'sy': 0,
    'sw': 124,
    'sh': 207
  }
}