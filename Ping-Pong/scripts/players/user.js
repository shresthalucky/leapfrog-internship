class User extends Player {
  constructor(position) {
    super(position);
    this.intialX;
  }

  setInitialX = () => {
    if (this.position.z <= BAT_INITIAL_Z) {
      this.intialX = this.position.x;
    }
  }

  getHitAngle = () => {
    let finalPosition = this.position;
    let dz = BOARD_Z - BAT_INITIAL_Z;
    let dx = finalPosition.x - this.intialX;
    let angle = Math.atan(dz / dx);
    return angle;
  }

  serve = (velocity) => {
    ball.serve(velocity, this.getHitAngle());
  }

  fitToCourt = () => {
    let left = BOARD_LEFT_X - BOUNDARY_PADDING + BALL_MAX_RADIUS;
    let right = BOARD_RIGHT_X + BOUNDARY_PADDING - BALL_MAX_RADIUS;
    let top = BOARD_Z + BOARD_HALF_LENGTH;

    this.position.x = clamp(left, right, this.position.x);
    this.position.z = clamp(0, top, this.position.z);
  }

  handleBatMovement = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.position = projection.get3dPosition(event.clientX, event.clientY);
    this.fitToCourt();
  }


  movementDirection = () => {
    if (this.position.z - (ball.current3dPos.z - BAT_THICKNESS) < 0) {
      Game.batDirection = true;
    }
  }
}