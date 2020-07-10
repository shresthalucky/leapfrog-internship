class Ball {
  constructor(startPos) {
    this.initial3dPos = new Position(startPos.x, startPos.y, startPos.z);
    this.current3dPos = new Position(startPos.x, startPos.y, startPos.z);
    this.radius = BALL_RADIUS; // default radius of ball
    this.angle = BALL_ANGLE; // drive ball with an angle with the horizontal plane
    this.initialVel = BALL_INITAL_VEL;
    this.velocity = {
      'z': this.initialVel * Math.cos(this.angle),
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
    this.bounceCount = 0;
  }

  draw = () => {

    if (Game.state.inPlay) {
      this.bounce();
    } else {
      this.current3dPos.x = Game.state.server.position.x;
    }

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

      this.current3dPos.z = this.initial3dPos.z + this.velocity.z * this.time;

      this.current3dPos.x = this.current3dPos.x + this.velocity.x * this.time;

      let vy = this.initialVel * Math.sin(this.angle);

      this.velocity.y = vy - ENV.gravity * this.time;
      // this.current3dPos.y = this.initial3dPos.y + (vy * this.time) - (ENV.gravity * this.time * this.time * 0.5);
      this.current3dPos.y = -this.initial3dPos.y + (vy * this.time) - (ENV.gravity * this.time * this.time * 0.5);
      // this.current3dPos.y = -this.current3dPos.y;

      if (this.current3dPos.y < 0) {
        this.rebound = true;
      }

      this.time += 0.2;

    } else {
      this.initialVel = -this.velocity.y;
      this.initial3dPos.z = this.current3dPos.z;
      this.current3dPos.y = 0;
      this.initial3dPos.y = 0;
      // this.velocity.z = this.initialVel * Math.cos(this.angle);
      this.rebound = false;
      this.time = 0;
      // this.draw();
      this.angle = this.getBounceAngle();

      this.bounceCount++;
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
    // this.initial3dPos = new Position(this.lastPosition.x, this.lastPosition.y, this.lastPosition.z);
    // this.current3dPos = new Position(this.lastPosition.x, this.lastPosition.y, this.lastPosition.z);

    this.initial3dPos = new Position(this.current3dPos.x, this.current3dPos.y, this.current3dPos.z);

    this.angle = -ENV.toRadian(upAngle);
    this.velocity.x = ENV.toRadian(sideAngle);

    this.initialVel = -velocity;
    this.velocity.z = this.initialVel * Math.cos(this.angle);

    this.bounceCount = 0;
    console.log('hit');
    debugger
  }

  serve = (velocity, sideAngle) => {

    this.angle = SERVE_ANGLE;
    this.velocity.x = ENV.toRadian(sideAngle);
    this.initialVel = velocity;
    
    this.velocity.z = this.initialVel * Math.cos(this.angle);
    Game.state.inPlay = true;
    // Game.state.ballStart = false;
    // debugger
  }

  checkCollision = (side) => {

    let ball = this.current3dPos;
    let ballY = Game.state.inPlay ? -ball.y : ball.y;

    let bat = side.surface3d;

    if (ball.x >= bat.topLeft.x
      && ballY >= bat.topLeft.y
      && ball.x <= bat.topRight.x
      && ballY >= bat.topRight.y
      && ball.x <= bat.bottomRight.x
      && ballY <= bat.bottomRight.y
      && ball.x >= bat.bottomLeft.x
      && ballY <= bat.bottomLeft.y
    ) {

      if (side === player) {
        if (ball.z <= side.position.z) {
          ball.z = side.position.z;
          return true;
        }
      } else if (side === opponent) {
        if (ball.z >= side.position.z) {
          ball.z = side.position.z;
          return true;
        }
      }

    }
    return false;
  }

}