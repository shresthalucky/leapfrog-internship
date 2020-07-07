class Board {
  constructor() {
    this.width = 1000;
    this.length = this.width * 9 / 5;
    this.height = 200;
    this.thickness = 20;
    this.z = 160;
    this.borderWidth = 10;

    const halfWidth = this.width / 2;
    const leftX = halfCanvasWidth - halfWidth;
    const rightX = halfCanvasWidth + halfWidth;

    const midLeftX = leftX + halfWidth - this.borderWidth / 2;
    const midRightX = rightX - halfWidth + this.borderWidth / 2;

    this.surface3d = {
      'outer': [
        new Position(leftX, 0, this.z),
        new Position(rightX, 0, this.z),
        new Position(rightX, 0, this.length + this.z),
        new Position(leftX, 0, this.length + this.z)
      ],

      'thickness': [
        new Position(leftX, 0, this.z),
        new Position(rightX, 0, this.z),
        new Position(rightX, this.thickness, this.z),
        new Position(leftX, this.thickness, this.z)
      ],

      'inner': [
        new Position(leftX + this.borderWidth * 2, 0, this.z + this.borderWidth),
        new Position(rightX - this.borderWidth * 2, 0, this.z + this.borderWidth),
        new Position(rightX - this.borderWidth, 0, this.length + this.z - this.borderWidth),
        new Position(leftX + this.borderWidth, 0, this.length + this.z - this.borderWidth)
      ],

      'midLine': [
        new Position(midLeftX, 0, this.z + 1),
        new Position(midRightX, 0, this.z + 1),
        new Position(midRightX, 0, this.length + this.z - 1),
        new Position(midLeftX, 0, this.length + this.z - 1)
      ]
    }

    this.surface2d = {
      'outer': this.surface3d.outer.map(projection.get2dProjection),
      'inner': this.surface3d.inner.map(projection.get2dProjection),
      'thickness': this.surface3d.thickness.map(projection.get2dProjection),
      'midLine': this.surface3d.midLine.map(projection.get2dProjection)
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
    ctx.fillStyle = '#FFF';
    ctx.fill();
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
    ctx.fillStyle = '#4879BC';
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
    ctx.fillStyle = '#4879BC';
    ctx.fill();
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
    ctx.fillStyle = '#FFF';
    ctx.fill();
    // ctx.stroke();
    ctx.closePath();
  }

  draw = () => {
    this.drawOuterSurface();
    this.drawInnerSurface();
    this.drawThickness();
    this.drawMidLine();
  }

}
