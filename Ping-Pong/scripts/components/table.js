class Board {
  constructor() {
    this.width = BOARD_WIDTH;
    this.length = BOARD_LENGTH;
    this.thickness = BOARD_THICKNESS;
    this.z = BOARD_Z;
    this.borderWidth = BORDER_WIDTH;
    this.y = BOARD_Y;

    const leftX = HALF_CANVAS_WIDTH - BOARD_HALF_WIDTH;
    const rightX = HALF_CANVAS_WIDTH + BOARD_HALF_WIDTH;

    const midLeftX = leftX + BOARD_HALF_WIDTH - this.borderWidth / 2;
    const midRightX = rightX - BOARD_HALF_WIDTH + this.borderWidth / 2;

    this.surface3d = {
      'outer': [
        new Position(leftX, this.y, this.z),
        new Position(rightX, this.y, this.z),
        new Position(rightX, this.y, this.length + this.z),
        new Position(leftX, this.y, this.length + this.z)
      ],

      'thickness': [
        new Position(leftX, this.y, this.z),
        new Position(rightX, this.y, this.z),
        new Position(rightX, this.thickness, this.z),
        new Position(leftX, this.thickness, this.z)
      ],

      'inner': [
        new Position(leftX + this.borderWidth * 2, this.y, this.z + this.borderWidth),
        new Position(rightX - this.borderWidth * 2, this.y, this.z + this.borderWidth),
        new Position(rightX - this.borderWidth, this.y, this.length + this.z - this.borderWidth),
        new Position(leftX + this.borderWidth, this.y, this.length + this.z - this.borderWidth)
      ],

      'midLine': [
        new Position(midLeftX, this.y, this.z + 1),
        new Position(midRightX, this.y, this.z + 1),
        new Position(midRightX, this.y, this.length + this.z - 1),
        new Position(midLeftX, this.y, this.length + this.z - 1)
      ],

      'tableLeftStand': [
        new Position(leftX + TABLE_STAND_PADDING, this.thickness, this.z + TABLE_STAND_PADDING),
        new Position(leftX + TABLE_STAND_PADDING * 2, this.thickness, this.z + TABLE_STAND_PADDING),
        new Position(leftX + TABLE_STAND_PADDING * 2, TABLE_HEIGHT, this.z + TABLE_STAND_PADDING),
        new Position(leftX + TABLE_STAND_PADDING, TABLE_HEIGHT, this.z + TABLE_STAND_PADDING)
      ],

      'tableLeftThickness': [
        new Position(leftX + TABLE_STAND_PADDING * 2, this.thickness, this.z + TABLE_STAND_PADDING),
        new Position(leftX + TABLE_STAND_PADDING * 2, this.thickness, this.z + TABLE_STAND_PADDING + this.thickness),
        new Position(leftX + TABLE_STAND_PADDING * 2, TABLE_HEIGHT, this.z + TABLE_STAND_PADDING + this.thickness),
        new Position(leftX + TABLE_STAND_PADDING * 2, TABLE_HEIGHT, this.z + TABLE_STAND_PADDING)
      ],

      'tableRightStand': [
        new Position(rightX - TABLE_STAND_PADDING, this.thickness, this.z + TABLE_STAND_PADDING),
        new Position(rightX - TABLE_STAND_PADDING * 2, this.thickness, this.z + TABLE_STAND_PADDING),
        new Position(rightX - TABLE_STAND_PADDING * 2, TABLE_HEIGHT, this.z + TABLE_STAND_PADDING),
        new Position(rightX - TABLE_STAND_PADDING, TABLE_HEIGHT, this.z + TABLE_STAND_PADDING)
      ],

      'tableRightThickness': [
        new Position(rightX - TABLE_STAND_PADDING * 2, this.thickness, this.z + TABLE_STAND_PADDING),
        new Position(rightX - TABLE_STAND_PADDING * 2, this.thickness, this.z + TABLE_STAND_PADDING + this.thickness),
        new Position(rightX - TABLE_STAND_PADDING * 2, TABLE_HEIGHT, this.z + TABLE_STAND_PADDING + this.thickness),
        new Position(rightX - TABLE_STAND_PADDING * 2, TABLE_HEIGHT, this.z + TABLE_STAND_PADDING)
      ],
    }

    this.surface2d = {
      'outer': this.surface3d.outer.map(projection.get2dProjection),
      'inner': this.surface3d.inner.map(projection.get2dProjection),
      'thickness': this.surface3d.thickness.map(projection.get2dProjection),
      'midLine': this.surface3d.midLine.map(projection.get2dProjection),
      'tableLeftStand': this.surface3d.tableLeftStand.map(projection.get2dProjection),
      'tableLeftThickness': this.surface3d.tableLeftThickness.map(projection.get2dProjection),
      'tableRightStand': this.surface3d.tableRightStand.map(projection.get2dProjection),
      'tableRightThickness': this.surface3d.tableRightThickness.map(projection.get2dProjection)
    }

    this.playerHalf = {
      'top': this.z + BOARD_HALF_LENGTH,
      'bottom': this.z,
      'left': leftX,
      'right': rightX
    }

    this.opponentHalf = {
      'top': this.z + BOARD_LENGTH,
      'bottom': this.z + BOARD_HALF_LENGTH,
      'left': leftX,
      'right': rightX
    }
  }

  drawOuterSurface = () => {
    let startPosition = this.surface2d.outer[0];
    ctx.beginPath();
    ctx.moveTo(startPosition.x, startPosition.y);
    for (const point of this.surface2d.outer) {
      ctx.lineTo(point.x, point.y);
    }
    ctx.lineTo(startPosition.x, startPosition.y);
    ctx.fillStyle = WHITE;
    ctx.fill();
    ctx.strokeStyle = BLACK_B;
    ctx.stroke();
    ctx.closePath();
  }

  drawInnerSurface = () => {
    let startPosition = this.surface2d.inner[0];
    ctx.beginPath();
    ctx.moveTo(startPosition.x, startPosition.y);
    for (const point of this.surface2d.inner) {
      ctx.lineTo(point.x, point.y);
    }
    ctx.lineTo(startPosition.x, startPosition.y);
    ctx.fillStyle = BOARD_BACKGROUND;
    ctx.fill();
    // ctx.stroke();
    ctx.closePath();
  }

  drawThickness = () => {
    let startPosition = this.surface2d.thickness[0];
    ctx.beginPath();
    ctx.moveTo(startPosition.x, startPosition.y);
    for (const point of this.surface2d.thickness) {
      ctx.lineTo(point.x, point.y);
    }
    ctx.lineTo(startPosition.x, startPosition.y);
    ctx.fillStyle = BLACK_C;
    ctx.fill();
    ctx.strokeStyle = BLACK_B;
    ctx.stroke();
    ctx.closePath();
  }

  drawMidLine = () => {
    let startPosition = this.surface2d.midLine[0];
    ctx.beginPath();
    ctx.moveTo(startPosition.x, startPosition.y);
    for (const point of this.surface2d.midLine) {
      ctx.lineTo(point.x, point.y);
    }
    ctx.lineTo(startPosition.x, startPosition.y);
    ctx.fillStyle = WHITE;
    ctx.fill();
    // ctx.stroke();
    ctx.closePath();
  }

  drawTableStand = () => {
    let startPosition = this.surface2d.tableLeftStand[0];
    ctx.beginPath();
    ctx.moveTo(startPosition.x, startPosition.y);
    for (const point of this.surface2d.tableLeftStand) {
      ctx.lineTo(point.x, point.y);
    }
    ctx.lineTo(startPosition.x, startPosition.y);
    ctx.fillStyle = BLACK_B;
    ctx.fill();

    startPosition = this.surface2d.tableLeftThickness[0];
    ctx.beginPath();
    ctx.moveTo(startPosition.x, startPosition.y);
    for (const point of this.surface2d.tableLeftThickness) {
      ctx.lineTo(point.x, point.y);
    }
    ctx.lineTo(startPosition.x, startPosition.y);
    ctx.fillStyle = BLACK_A;
    ctx.fill();

    startPosition = this.surface2d.tableRightStand[0];
    ctx.beginPath();
    ctx.moveTo(startPosition.x, startPosition.y);
    for (const point of this.surface2d.tableRightStand) {
      ctx.lineTo(point.x, point.y);
    }
    ctx.lineTo(startPosition.x, startPosition.y);
    ctx.fillStyle = BLACK_B;
    ctx.fill();

    startPosition = this.surface2d.tableRightThickness[0];
    ctx.beginPath();
    ctx.moveTo(startPosition.x, startPosition.y);
    for (const point of this.surface2d.tableRightThickness) {
      ctx.lineTo(point.x, point.y);
    }
    ctx.lineTo(startPosition.x, startPosition.y);
    ctx.fillStyle = BLACK_A;
    ctx.fill();

  }

  draw = () => {
    this.drawTableStand();
    this.drawOuterSurface();
    this.drawInnerSurface();
    this.drawThickness();
    this.drawMidLine();
  }

  recordBounce = (ballPos) => {
    if (ballPos.x >= this.playerHalf.left
      && ballPos.x <= this.playerHalf.right
      && ballPos.z >= this.playerHalf.bottom
      && ballPos.z <= this.playerHalf.top
    ) {
      player.bounce++;
    }

    if (ballPos.x >= this.opponentHalf.left
      && ballPos.x <= this.opponentHalf.right
      && ballPos.z >= this.opponentHalf.bottom
      && ballPos.z <= this.opponentHalf.top
    ) {
      opponent.bounce++;
    }
  }

}

class Net {
  constructor() {
    this.width = BOARD_WIDTH;
    this.height = NET_HEIGHT;
    this.z = NET_Z;
    this.y = BOARD_Y;

    const BOARD_HALF_WIDTH = this.width / 2;
    const leftX = HALF_CANVAS_WIDTH - BOARD_HALF_WIDTH;
    const rightX = HALF_CANVAS_WIDTH + BOARD_HALF_WIDTH;

    this.surface3d = {
      'topLeft': new Position(leftX, -this.height, this.z),
      'topRight': new Position(rightX, -this.height, this.z),
      'bottomRight': new Position(rightX, this.y, this.z),
      'bottomLeft': new Position(leftX, this.y, this.z),
      'netImageLeft': new Position(leftX, this.y, this.z),
      'netImageRight': new Position(leftX + Net.sprite.strip.sw, this.y, this.z),
    }

    this.surface2d = {
      'topLeft': projection.get2dProjection(this.surface3d.topLeft),
      'topRight': projection.get2dProjection(this.surface3d.topRight),
      'bottomRight': projection.get2dProjection(this.surface3d.bottomRight),
      'bottomLeft': projection.get2dProjection(this.surface3d.bottomLeft),
      'netImageLeft': projection.get2dProjection(this.surface3d.netImageLeft),
      'netImageRight': projection.get2dProjection(this.surface3d.netImageRight)
    }
  }

  draw = () => {
    let height = this.surface2d.topLeft.get2dDistance(this.surface2d.bottomLeft);
    let width = this.surface2d.topRight.get2dDistance(this.surface2d.topLeft);
    let spriteWidth = this.surface2d.netImageLeft.get2dDistance(this.surface2d.netImageRight);

    // ctx.beginPath();
    // ctx.rect(this.surface2d.topLeft.x, this.surface2d.topLeft.y, width, height);
    // ctx.fillStyle = "#dfdfdf";
    // ctx.fill();
    // ctx.closePath();

    for (let i = 0; i < width; i += spriteWidth) {
      ctx.drawImage(sprite,
        Net.sprite.strip.sx,
        Net.sprite.strip.sy,
        Net.sprite.strip.sw,
        Net.sprite.strip.sh,
        this.surface2d.topLeft.x + i,
        this.surface2d.topLeft.y,
        spriteWidth,
        height);
    }
  }

  checkCollision = () => {

    let playBall = {
      'playerZ': ball.current3dPos.z - BALL_MAX_RADIUS,
      'opponentZ': ball.current3dPos.z + BALL_MAX_RADIUS,
      'topY': ball.current3dPos.y + BALL_MAX_RADIUS,
      'bottomY': ball.current3dPos.y - BALL_MAX_RADIUS
    }

    if (
      ((playBall.opponentZ >= this.z - BALL_MAX_RADIUS && playBall.opponentZ <= this.z + BALL_MAX_RADIUS)
        || (playBall.playerZ >= this.z - BALL_MAX_RADIUS && playBall.playerZ <= this.z + BALL_MAX_RADIUS))
      && playBall.bottomY <= this.height
    ) {
      return true;
    }
    return false;
  }
}

Net.sprite = {
  'strip': {
    'sx': 127,
    'sy': 0,
    'sw': 37,
    'sh': 90
  }
}