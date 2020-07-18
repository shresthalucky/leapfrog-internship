class User extends Player {
  constructor(position) {
    super(position);
    this.intialX = 0;
  }

  setInitialX = () => {
    if (this.position.z <= BAT_INITIAL_Z) {
      this.intialX = this.position.x;
    }
  }

  resetInitialX = () => {
    this.intialX = 0;
  }

  getHitAngle = () => {
    if (this.intialX) {
      const finalPosition = this.position;
      const dz = BOARD_Z - BAT_INITIAL_Z;
      const dx = finalPosition.x - this.intialX;
      const angle = Math.atan(dz / dx);
      return angle;
    }
    return ENV.toRadian(90);
  }

  serve = (velocity) => {
    ball.serve(velocity, this.getHitAngle());
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
    this.prevPositionX = this.position.x
    this.prevPositionY = this.position.y
    this.position = projection.get3dPosition(event.clientX, event.clientY);
    this.fitToCourt();
  }


  movementDirection = () => {
    if (this.position.z - (ball.current3dPos.z - BAT_THICKNESS) < 0) {
      Game.batDirection = true;
    }
  }
}