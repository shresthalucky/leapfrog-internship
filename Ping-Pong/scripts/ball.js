class Ball {
  constructor(startPos) {
    this.intial3dPos = startPos;
    this.current3dPos = startPos;
    this.radius = 20;
    this.angle = 30;
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
    // this.intial2dPos = projection.get2dProjection(this.intial3dPos);
    // this.current2dPos = projection.get2dProjection(this.current3dPos);
  }


  draw = () => {
    // debugger
    if(!this.rebound) {

      let current2dPos = projection.get2dProjection(this.current3dPos);
      console.log(current2dPos.y);

      ctx.beginPath();
      ctx.arc(current2dPos.x, current2dPos.y, this.radius, 0, 360);
      ctx.fillStyle = "#000";
      ctx.fill();
      ctx.closePath();

      this.current3dPos.z = this.intial3dPos.z + this.velocity.z * this.time;
      debugger
      console.log(this.current3dPos.z);

      let vy = this.intialVel * Math.sin(this.angle);

      this.velocity.y = vy - ENV.gravity * this.time;
      this.current3dPos.y = this.intial3dPos.y + (vy * this.time) - (ENV.gravity * this.time * this.time * 0.5);

      if(this.current3dPos.y < this.intial3dPos.y) {
        this.rebound = true;
      }


      this.time += 0.5;
      // console.log(this.current3dPos);

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