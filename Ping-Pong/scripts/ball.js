class Ball {
  constructor(startPos) {
    this.intial3dPos = new Position(startPos.x, startPos.y, startPos.z);
    this.current3dPos = new Position(startPos.x, startPos.y, startPos.z);
    this.radius = 24; // default radius of ball
    this.angle = 30 * Math.PI / 180; // drive ball with an angle with the horizontal plane
    this.intialVel = 100;
    this.velocity = {
      'z': this.intialVel * Math.cos(this.angle),
      'y': 0,
      'x': 0
    }
    this.acceleration = {
      'z': 0,
      'y': 0,
      'x': 0
    }
    this.time = 0;
    this.rebound = false;
    this.lastPosition = new Position(startPos.x, startPos.y, startPos.z);
    this.inPlay = false;
  }

  draw = () => {
    let current3dY = this.current3dPos.y > 0 ? -this.current3dPos.y : this.current3dPos.y;
    let current2dPos = projection.get2dProjection(new Position(this.current3dPos.x, current3dY, this.current3dPos.z));
    this.radius = current2dPos.y * 0.03;

    // console.log(current2dPos);

    this.drawShadow();

    ctx.beginPath();
    ctx.arc(current2dPos.x, current2dPos.y, this.radius, 0, 360);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.closePath();

    if (this.inPlay) {
      this.bounce();
    }
  }

  getBounceAngle = () => {
    let d = this.lastPosition.get3dDistance(this.current3dPos);
    let dx = this.current3dPos.get3dDistance(new Position(this.lastPosition.x, 0, this.lastPosition.z));
    // debugger
    return Math.atan(d / dx);
  }

  bounce = () => {
    if (!this.rebound) {

      this.lastPosition.x = this.current3dPos.x;
      this.lastPosition.y = this.current3dPos.y;
      this.lastPosition.z = this.current3dPos.z;

      this.current3dPos.z = this.intial3dPos.z + this.velocity.z * this.time;

      this.current3dPos.x = this.current3dPos.x + this.velocity.x * this.time;

      let vy = this.intialVel * Math.sin(this.angle);

      this.velocity.y = vy - ENV.gravity * this.time;
      // this.current3dPos.y = this.intial3dPos.y + (vy * this.time) - (ENV.gravity * this.time * this.time * 0.5);
      this.current3dPos.y = -this.intial3dPos.y + (vy * this.time) - (ENV.gravity * this.time * this.time * 0.5);
      // this.current3dPos.y = -this.current3dPos.y;

      if (this.current3dPos.y < 0) {
        this.rebound = true;
      }

      // this.draw();

      this.time += 0.2;

    } else {
      this.intialVel = -this.velocity.y;
      this.intial3dPos.z = this.current3dPos.z;
      this.current3dPos.y = 0;
      this.intial3dPos.y = 0;
      this.velocity.z = this.intialVel * Math.cos(this.angle);
      this.rebound = false;
      this.time = 0;
      // this.draw();
      this.angle = this.getBounceAngle();
      // console.log(this.lastPosition);
      // console.log(this.current3dPos);
      // console.log(this.getBounceAngle() * 180/Math.PI);
    }
  }

  drawShadow = () => {
    let shadow = new Position(this.current3dPos.x, 0, this.current3dPos.z);
    shadow = projection.get2dProjection(shadow);

    ctx.beginPath();
    // ctx.arc(shadow.x, shadow.y, this.radius, 0, 360);
    ctx.ellipse(shadow.x, shadow.y, this.radius, this.radius * 0.5, 0, 0, 360);
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fill();
    ctx.closePath();
  }

  hit = (velocity, upAngle, sideAngle) => {
    // this.intial3dPos = new Position(this.lastPosition.x, this.lastPosition.y, this.lastPosition.z);
    // this.current3dPos = new Position(this.lastPosition.x, this.lastPosition.y, this.lastPosition.z);

    this.intial3dPos = new Position(this.current3dPos.x, this.current3dPos.y, this.current3dPos.z);

    this.angle = ENV.toRadian(upAngle);
    this.velocity.x = ENV.toRadian(sideAngle);

    this.intialVel = velocity;
    this.velocity.z = this.intialVel * Math.cos(this.angle);
    this.inPlay = true;
  }

  serve = (velocity, sideAngle) => {

    this.velocity.x = ENV.toRadian(sideAngle);

    this.angle = ENV.toRadian(-45);
    this.intialVel = velocity;
    this.velocity.z = this.intialVel * Math.cos(this.angle);
    this.inPlay = true;
  }

  ballHit = (player) => {

    let ball = this.current3dPos;
    let bat = player.surface3d;
    if (ball.x >= bat.topLeft.x
      && ball.y >= bat.topLeft.y
      && ball.x <= bat.topRight.x
      && ball.y >= bat.topRight.y
      && ball.x <= bat.bottomRight.x
      && ball.y <= bat.bottomRight.y
      && ball.x >= bat.bottomLeft.x
      && ball.y <= bat.bottomLeft.y
      && ball.z >= bat.topLeft.z
      && ball.z <= bat.topLeft.z + player.batThickness
    ) {
      console.log('hit')
      return true;
    }
    return false;
  }

}