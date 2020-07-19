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
    this.time = 0;
    this.rebound = false;
    this.lastPosition = new Position(startPos.x, startPos.y, startPos.z);
    this.bounceCount = 0;
    this.bounceLevel = -BOARD_Y;
  }

  getRadius = () => Math.max(SLOPE * (this.current3dPos.z - BOARD_Z) + BALL_MAX_RADIUS, 4);

  draw = () => {

    if (Game.state.served) {
      this.bounce();
    }

    let current3dY = this.current3dPos.y > 0 ? -this.current3dPos.y : this.current3dPos.y;
    let current2dPos = projection.get2dProjection(new Position(this.current3dPos.x, current3dY, this.current3dPos.z));

    if (this.current3dPos.z > 0) {
      this.radius = this.getRadius();
    }

    this.drawShadow();

    ctx.beginPath();
    ctx.arc(current2dPos.x, current2dPos.y, this.radius, 0, 360);
    ctx.fillStyle = BALL_BACKGROUND;
    ctx.fill();
    ctx.strokeStyle = BALL_BORDER;
    ctx.stroke();
    ctx.closePath();
  }

  getBounceAngle = () => {
    let d = this.lastPosition.get3dDistance(this.current3dPos);
    let dx = this.current3dPos.get3dDistance(new Position(this.lastPosition.x, 0, this.lastPosition.z));
    return Math.atan(d / dx);
  }

  bounce = () => {
    if (!this.rebound) {

      this.lastPosition = new Position(this.current3dPos.x, this.current3dPos.y, this.current3dPos.z);

      this.current3dPos.z = this.initial3dPos.z + this.velocity.z * this.time;

      if (this.velocity.x !== 0) {
        this.current3dPos.x += this.velocity.x * 10;
      }

      let vy = this.initialVel * Math.sin(this.angle);

      this.velocity.y = vy - ENV.gravity * this.time;
      this.current3dPos.y = -this.initial3dPos.y + (vy * this.time) - (ENV.gravity * this.time * this.time * 0.5);

      if (this.current3dPos.y < this.bounceLevel) {
        this.rebound = true;
      }

      this.time += TIME;

    } else {
      player.logBounce();
      opponent.logBounce();

      if (Game.state.ballIn) {
        bounceIn.play();
      } else {
        bounceOut.play();
      }

      this.initialVel = -this.velocity.y;
      this.initial3dPos.z = this.current3dPos.z;
      this.current3dPos.y = -this.bounceLevel;
      this.initial3dPos.y = -this.bounceLevel;
      this.rebound = false;
      this.time = 0;
      this.angle = this.getBounceAngle();
      this.bounceCount++;
    }
  }

  drawShadow = () => {
    let y = this.isBallInside() ? BOARD_Y : 0;
    let shadow = new Position(this.current3dPos.x, y, this.current3dPos.z);
    shadow = projection.get2dProjection(shadow);

    ctx.beginPath();
    ctx.ellipse(shadow.x, shadow.y, this.radius, this.radius * 0.5, 0, 0, 360);
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fill();
    ctx.closePath();
  }

  bounceBack = (side) => {
    let offsetZ;
    let v;

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
  }

  hit = (side, velocity, sideAngle, upAngle) => {

    let offsetZ;
    let v;

    this.angle = ENV.toRadian(upAngle);
    this.initialVel = velocity;

    if (side === player) {
      offsetZ = side.position.z + 10;
      v = this.initialVel;
      this.velocity.x = sideAngle > 0 ? Math.cos(sideAngle) : -Math.cos(sideAngle);
    } else {
      offsetZ = side.position.z - 10;
      v = -this.initialVel;
      this.velocity.x = 0;
    }

    this.initial3dPos = new Position(this.current3dPos.x, -this.current3dPos.y, offsetZ);
    this.current3dPos = new Position(this.current3dPos.x, -this.current3dPos.y, offsetZ);

    this.velocity.z = v * Math.cos(this.angle)

    this.time = 0;
    this.bounceCount = 0;    
  }

  setPosition = (position) => {
    this.initial3dPos = new Position(position.x, position.y, position.z);
    this.current3dPos = new Position(position.x, position.y, position.z);
    this.bounceCount = 0;
    this.time = 0;
  }

  serve = (velocity, sideAngle) => {
    this.initialVel = Math.abs(velocity);

    if (sideAngle) {
      this.velocity.x = sideAngle > 0 ? Math.cos(sideAngle) : -Math.cos(sideAngle);
    } else {
      this.velocity.x = 0;
    }

    this.angle = SERVE_ANGLE;
    this.velocity.z = velocity * Math.cos(this.angle);
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
        if (ball.z <= side.position.z && ball.z >= side.position.z - BAT_THICKNESS) {
          if (Game.state.inPlay) ball.z = side.position.z;
          return true;
        }
      } else if (side === opponent) {
        if (ball.z >= side.position.z && ball.z <= side.position.z + BAT_THICKNESS) {
          if (Game.state.inPlay) ball.z = side.position.z;
          return true;
        }
      }
    }
    return false;
  }

  isBallInside = () => {
    if (this.current3dPos.x <= BOARD_RIGHT_X + BALL_MAX_RADIUS
      && this.current3dPos.x >= BOARD_LEFT_X - BALL_MAX_RADIUS
      && this.current3dPos.z <= BOARD_END + BALL_MAX_RADIUS
      && this.current3dPos.z >= BOARD_Z - BALL_MAX_RADIUS
    ) {
      this.bounceLevel = -BOARD_Y;
      return true;
    }
    this.bounceLevel = 0;
    return false;
  }

  ballOut = () => {
    if (this.current3dPos.x >= RIGHT_WALL
      || this.current3dPos.x <= LEFT_WALL
      || this.current3dPos.z <= 0
      || this.current3dPos.z >= END_WALL
    ) {
      Game.state.ballIn = true;
      return true;
    }
    Game.state.ballIn = false;
    return false;
  }


}