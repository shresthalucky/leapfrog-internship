class Position {
  constructor(startX, startY, width, height) {
    this.startX = startX;
    this.startY = startY;
    this.width = width;
    this.height = height;

    this.coordinates = {
      'top': {
        'x': this.startX,
        'y': this.startY
      },
      'bottom': {
        'x': this.startX + this.width,
        'y': this.startY + this.height
      }
    }
  }
}
