const Car = function (startPosition, width, height) {
  this.width = width;
  this.height = height;
  this.position = {
    'start': startPosition,
    'end': new Position(startPosition.x + this.width, startPosition.y + this.height)
  }

  this.draw = (ctx) => {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.position.start.x, this.position.start.y, this.width, this.height);
  }

  this.moveDown = () => {
    this.position.start.y += 4;
    this.position.end.y += 4;
  }

  this.checkCollision = (nextCar) => {
    if (this.position.start.x < nextCar.position.end.x &&
      this.position.end.x > nextCar.position.start.x &&
      this.position.start.y < nextCar.position.end.y &&
      this.position.end.y > nextCar.position.start.y) {
      console.log('collide');
      return true;
    }
    return false;
  }

}