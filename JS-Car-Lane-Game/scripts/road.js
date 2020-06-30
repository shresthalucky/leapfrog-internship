const Lane = function (startPosition, endPosition, width, beginX) {
  this.position = {
    'start' : startPosition,
    'end' : endPosition
  }
  this.width = width;
  this.beginX = this.position.start.x + beginX;
  this.cars = [];

  this.draw = (ctx) => {
    for (let i = 0; i < 290; i++) {
      ctx.drawImage(images.road, this.position.start.x, this.position.start.y, this.width, this.position.end.y);
    }
    this.position.start.y += Game.speed;
    for (let i = 0; i < 290; i++) {
      ctx.drawImage(images.road, this.position.start.x, this.position.start.y - this.position.end.y, this.width, this.position.end.y);
    }
    if(this.position.start.y > this.position.end.y) {
      this.position.start.y = 0;
    }
  }

  this.generateObstacle = (carWidth, carHeight) => {
    let obs = new Obstacle(new Position(this.beginX, -carHeight), carWidth, carHeight);
    this.cars.push(obs);
    return obs;
  }

  this.moveObstacles = (ctx, height) => {
    for(let i=0; i<this.cars.length; i++) {
      let obs = this.cars[i];

      if(obs.active){
        obs.moveDown(height);
        obs.draw(ctx);
      }
    }
  }

  this.checkCollision = (playerCar) => {
    for(let i=0; i<this.cars.length; i++) {
      let obs = this.cars[i];
      if(obs.active){
        if (playerCar.position.start.x < obs.position.end.x &&
          playerCar.position.end.x > obs.position.start.x &&
          playerCar.position.start.y < obs.position.end.y &&
          playerCar.position.end.y > obs.position.start.y) {
          return true;
        }
      }
    }
    return false;
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