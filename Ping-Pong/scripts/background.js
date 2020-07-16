class Floor {
  constructor() {
    const y = TABLE_HEIGHT;

    this.surface3d = {
      'topLeft': new Position(LEFT_WALL, y, END_WALL),
      'topRight': new Position(RIGHT_WALL, y, END_WALL),
      'bottomRight': new Position(RIGHT_WALL, y, projection.camera.position.z + 1),
      'bottomLeft': new Position(LEFT_WALL, y, projection.camera.position.z + 1)
    }

    this.surface2d = {
      'topLeft': projection.get2dProjection(this.surface3d.topLeft),
      'topRight': projection.get2dProjection(this.surface3d.topRight),
      'bottomRight': projection.get2dProjection(this.surface3d.bottomRight),
      'bottomLeft': projection.get2dProjection(this.surface3d.bottomLeft)
    }
  }

  draw = () => {
    ctx.beginPath();
    ctx.moveTo(this.surface2d.topLeft.x, this.surface2d.topLeft.y);
    ctx.lineTo(this.surface2d.topRight.x, this.surface2d.topRight.y);
    ctx.lineTo(this.surface2d.bottomRight.x, this.surface2d.bottomRight.y);
    ctx.lineTo(this.surface2d.bottomLeft.x, this.surface2d.bottomLeft.y);
    ctx.lineTo(this.surface2d.topLeft.x, this.surface2d.topLeft.y);
    ctx.fillStyle = '#90A4AE';
    ctx.fill();
    ctx.closePath();
  }
}

class Wall {
  constructor() {
    const y = TABLE_HEIGHT;
    const top = -1000;

    this.surface3d = {
      'leftWall': [
        new Position(LEFT_WALL, y, projection.camera.position.z + 1),
        new Position(LEFT_WALL, y, END_WALL),
        new Position(LEFT_WALL, top, END_WALL),
        new Position(LEFT_WALL, top, projection.camera.position.z + 1)
      ],
      'backWall': [
        new Position(LEFT_WALL, y, END_WALL),
        new Position(LEFT_WALL, top, END_WALL),
        new Position(RIGHT_WALL, top, END_WALL),
        new Position(RIGHT_WALL, y, END_WALL)
      ],
      'rightWall': [
        new Position(RIGHT_WALL, y, projection.camera.position.z + 1),
        new Position(RIGHT_WALL, y, END_WALL),
        new Position(RIGHT_WALL, top, END_WALL),
        new Position(RIGHT_WALL, top, projection.camera.position.z + 1)
      ]
    }

    this.surface2d = {
      'leftWall': this.surface3d.leftWall.map(projection.get2dProjection),
      'backWall': this.surface3d.backWall.map(projection.get2dProjection),
      'rightWall': this.surface3d.rightWall.map(projection.get2dProjection)
    }
  }

  drawLeftWall = () => {
    let startPosition = this.surface2d.leftWall[0];
    ctx.beginPath();
    ctx.moveTo(startPosition.x, startPosition.y);
    for (const point of this.surface2d.leftWall) {
      ctx.lineTo(point.x, point.y);
    }
    ctx.lineTo(startPosition.x, startPosition.y);
    ctx.fillStyle = '#BDBDBD';
    ctx.fill();
    ctx.closePath();
  }

  drawBackWall = () => {
    let startPosition = this.surface2d.backWall[0];
    ctx.beginPath();
    ctx.moveTo(startPosition.x, startPosition.y);
    for (const point of this.surface2d.backWall) {
      ctx.lineTo(point.x, point.y);
    }
    ctx.lineTo(startPosition.x, startPosition.y);
    ctx.fillStyle = '#BDBDBD';
    ctx.fill();
    ctx.closePath();
  }

  drawRightWall = () => {
    let startPosition = this.surface2d.rightWall[0];
    ctx.beginPath();
    ctx.moveTo(startPosition.x, startPosition.y);
    for (const point of this.surface2d.rightWall) {
      ctx.lineTo(point.x, point.y);
    }
    ctx.lineTo(startPosition.x, startPosition.y);
    ctx.fillStyle = '#BDBDBD';
    ctx.fill();
    ctx.closePath();
  }

  draw = () => {
    this.drawLeftWall();
    this.drawBackWall();
    this.drawRightWall();
  }

}