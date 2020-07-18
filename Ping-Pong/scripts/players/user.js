class User extends Player {
  constructor(position) {
    super(position);
  }

  getParameters = () => {
    const dt = (performance.now() - lastFrameTime) / 1000;
    const dx = this.position.x - this.prevPositionX;
    const dz = this.position.z - this.prevPositionZ;
    const sideAngle = dx !== 0 ? Math.atan(dz / dx) : 0;
    const v = clamp(0, 1200, dz/dt);
    
    const velocity = (v + 2400) / 40;
    const upAngle = 120 - velocity;

    console.log('v', velocity);
    console.log('angleX', sideAngle);
    console.log('angleY', upAngle);

    return [velocity, sideAngle, upAngle];
  }

  serve = () => {
    ball.serve(...this.getParameters());
  }

  fitToCourt = () => {
    const left = BOARD_LEFT_X - BOUNDARY_PADDING + BALL_MAX_RADIUS;
    const right = BOARD_RIGHT_X + BOUNDARY_PADDING - BALL_MAX_RADIUS;
    const top = BOARD_Z + BOARD_HALF_LENGTH;
    this.position.x = clamp(left, right, this.position.x);
    this.position.z = clamp(0, top, this.position.z);
  }

  handleBatMovement = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.prevPositionX = this.position.x;
    this.prevPositionZ = this.position.z;
    this.position = projection.get3dPosition(event.clientX, event.clientY);
    this.fitToCourt();
  }


  movementDirection = () => {
    if (this.position.z - (ball.current3dPos.z - BAT_THICKNESS) < 0) {
      Game.batDirection = true;
    }
  }
}