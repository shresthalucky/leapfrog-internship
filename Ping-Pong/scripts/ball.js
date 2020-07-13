class Ball {
  constructor(startPos) {
    this.initial3dPos = new Position(startPos.x, startPos.y, startPos.z);
    this.current3dPos = new Position(startPos.x, startPos.y, startPos.z);
    this.radius = BALL_MAX_RADIUS; // default radius of ball
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
    this.period = 0;
    this.rebound = false;
    this.lastPosition = new Position(startPos.x, startPos.y, startPos.z);
    this.bounceCount = 0;
    // this.active = true;
  }

  getRadius = () => SLOPE * (this.current3dPos.z - BOARD_Z) + BALL_MAX_RADIUS;

  draw = () => {

    if (Game.state.served) {
      this.bounce();
      // console.log(this.velocity.x);
    } else {
      this.current3dPos.x = Game.state.server.position.x;
    }

    let current3dY = this.current3dPos.y > 0 ? -this.current3dPos.y : this.current3dPos.y;
    let current2dPos = projection.get2dProjection(new Position(this.current3dPos.x, current3dY, this.current3dPos.z));

    if (this.current3dPos.z > 0) {
      this.radius = this.getRadius();
    }

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

      if (this.velocity.x !== 0) {
        this.current3dPos.x = this.current3dPos.x + this.velocity.x * this.period;
        this.period += 0.1;
      }
      
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
      // console.log('bounce');
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

  bounceBack = (side) => {
    let offsetZ;
    let v;

    // this.period = 0;
    this.angle = 0;
    this.initialVel = 40;

    if (side === player) {
      offsetZ = net.z - 50;
      v = -this.initialVel;
    } else {
      offsetZ = net.z + 50;
      v = this.initialVel;
    }
    
    this.initial3dPos = new Position(this.current3dPos.x, -this.current3dPos.y, offsetZ);
    this.current3dPos = new Position(this.current3dPos.x, -this.current3dPos.y, offsetZ);

    this.velocity.z = v * Math.cos(this.angle);

    this.time = 0;
    this.bounceCount = 0;
    // debugger 

  }

  hit = (side, velocity, upAngle, sideAngle) => {

    let offsetZ;
    let v;

    this.period = 0;
    this.angle = ENV.toRadian(upAngle);
    this.velocity.x = Math.sin(sideAngle);
    this.initialVel = velocity;

    if (side === player) {
      offsetZ = side.position.z + 10;
      v = this.initialVel;
    } else {
      offsetZ = side.position.z - 10;
      v = -this.initialVel;
    }

    this.initial3dPos = new Position(this.current3dPos.x, -this.current3dPos.y, offsetZ);
    this.current3dPos = new Position(this.current3dPos.x, -this.current3dPos.y, offsetZ);

    this.velocity.z = v * Math.cos(this.angle)

    this.time = 0;
    this.bounceCount = 0;
  }

  setServePosition = (server) => {
    let ballPosition;
    
    if (server === player) {
      ballPosition = new Position(player.position.x , BOARD_Y - BALL_START_HEIGHT, BOARD_Z);
    }

    this.period = 0;
    this.initial3dPos = ballPosition;
    this.current3dPos = ballPosition;

    this.time = 0;
    this.bounceCount = 0;
  }

  serve = (velocity, sideAngle) => {
    this.initialVel = velocity;
    this.angle = SERVE_ANGLE;
    this.velocity.x = Math.sin(sideAngle);
    this.velocity.z = this.initialVel * Math.cos(this.angle);
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

  isBallInside() {
    if (this.current3dPos.x <= table.surface3d.outer[1].x + BALL_MAX_RADIUS
      && this.current3dPos.x >= table.surface3d.outer[0].x - BALL_MAX_RADIUS
      && this.current3dPos.z <= table.surface3d.outer[2].z + BOARD_OFFSET
      && this.current3dPos.z >= table.surface3d.outer[0].z - BOARD_OFFSET
    ) {
      return true;
    }
    return false;
  }

}