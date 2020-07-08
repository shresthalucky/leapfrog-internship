class Ball {
  constructor(startPos) {
    this.intial3dPos = new Position(startPos.x, startPos.y, startPos.z);
    this.current3dPos = new Position(startPos.x, startPos.y, startPos.z);
    this.radius = 16;
    this.angle = 60 * Math.PI / 180;
    this.intialVel = 50;
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
    let current2dPos = projection.get2dProjection(this.current3dPos);

    ctx.beginPath();
    ctx.arc(current2dPos.x, current2dPos.y, this.radius, 0, 360);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.closePath();

    console.log(current2dPos.x, -current2dPos.y);
  }

  bounce = () => {
    if (!this.rebound) {
      let current2dPos = projection.get2dProjection(this.current3dPos.reflectXAxis());

      ctx.beginPath();
      ctx.arc(current2dPos.x, current2dPos.y, this.radius, 0, 360);
      ctx.fillStyle = "#000";
      ctx.fill();
      ctx.closePath();

      this.current3dPos.z = this.intial3dPos.z + this.velocity.z * this.time;

      let vy = this.intialVel * Math.sin(this.angle);

      this.velocity.y = vy - ENV.gravity * this.time;
      this.current3dPos.y = this.intial3dPos.y + (vy * this.time) - (ENV.gravity * this.time * this.time * 0.5);

      // debugger

      if (this.current3dPos.y < this.intial3dPos.y) {
        console.log(this.current3dPos.z, this.current3dPos.y);
        this.rebound = true;
        console.log('bounce');
      }

      this.time += 0.1;

    } else {

      this.intialVel = -this.velocity.y;
      this.intial3dPos.z = this.current3dPos.z;
      this.current3dPos.y = this.intial3dPos.y;

      this.velocity.z = this.intialVel * Math.cos(this.angle);

      this.rebound = false;
      this.time = 0;
    }
  }

}