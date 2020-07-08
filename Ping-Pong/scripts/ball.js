class Ball {
  constructor(startPos) {
    this.intial3dPos = new Position(startPos.x, startPos.y, startPos.z);
    this.current3dPos = new Position(startPos.x, startPos.y, startPos.z);
    this.radius = 24; // default radius of ball
    this.angle = 45 * Math.PI / 180; // drive ball with 45 degree angle with the horizontal plane
    this.intialVel = 60;
    this.velocity = {
      'z': this.intialVel * Math.cos(this.angle),
      'y': 0
    }
    this.acceleration = {
      'z': 0,
      'y': 0
    }
    this.time = 0;
    this.rebound = false;
  }

  draw = () => {
    // let current2dPos = projection.get2dProjection(this.current3dPos);
    let current2dPos = projection.get2dProjection(this.current3dPos.reflectXAxis());

    this.radius = current2dPos.y * 0.03;

    ctx.beginPath();
    ctx.arc(current2dPos.x, current2dPos.y, this.radius, 0, 360);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.closePath();
  }

  bounce = () => {
    if (!this.rebound) {

      this.draw();
      this.current3dPos.z = this.intial3dPos.z + this.velocity.z * this.time;

      let vy = this.intialVel * Math.sin(this.angle);

      this.velocity.y = vy - ENV.gravity * this.time;
      this.current3dPos.y = this.intial3dPos.y + (vy * this.time) - (ENV.gravity * this.time * this.time * 0.5);

      if (this.current3dPos.y < -BALL_START_HEIGHT * 2) {
        this.rebound = true;
      }

      this.time += 0.1;

    } else {
      this.intialVel = -this.velocity.y;
      this.intial3dPos.z = this.current3dPos.z;
      this.current3dPos.y = -BALL_START_HEIGHT * 2;
      this.intial3dPos.y = -BALL_START_HEIGHT * 2;
      this.velocity.z = this.intialVel * Math.cos(this.angle);
      this.rebound = false;
      this.time = 0;
      this.draw();
    }
  }

}