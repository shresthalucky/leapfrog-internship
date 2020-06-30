const Lane = function (startPosition, endPosition, width) {
  this.position = {
    'start' : startPosition,
    'end' : endPosition
  }
  this.width = width;

  this.draw = (ctx) => {
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.position.start.x, this.position.start.y, width, this.position.end.y);
  }
}

const LaneSeparator = function (startPosition, endPosition, width) {
  this.position = {
    'start' : startPosition,
    'end' : endPosition
  }
  this.width = width;

  this.draw = (ctx) => {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.position.start.x, this.position.start.y, width, this.position.end.y);
  }
}