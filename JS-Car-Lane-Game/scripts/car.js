const Car = function(startPosition, width, height) {
  this.width = width;
  this.height = height;
  this.position = {
    'start' : startPosition,
    'end' : new Position(startPosition.x + this.width, startPosition.y + this.height)
  }

  this.draw = (ctx) => {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.position.start.x, this.position.start.y, this.width, this.height);
  }

  this.moveDown = (ctx) => {
    this.position.start.y++;
    this.position.end.y++;
  }
}