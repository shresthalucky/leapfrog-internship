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

  fitToCourt = () => {

    let right = table.surface3d.outer[1].x + BOUNDARY_PADDING - BALL_MAX_RADIUS;
    let left = table.surface3d.outer[0].x - BOUNDARY_PADDING + BALL_MAX_RADIUS;
    let top = BOARD_Z + BOARD_HALF_LENGTH;

    if (this.position.x > right) {
      this.position.x = right;
      ball.current3dPos
    }

    if (this.position.x < left) {
      this.position.x = left;
    }

    if (this.position.z > top) {
      this.position.z = top;
    }
  }

  handleBatMovement = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.position = projection.get3dPosition(event.clientX, event.clientY);
    // this.position = projection.get3dPosition(event.clientX, event.clientY - projection.camera.position.y);
    this.fitToCourt();
  }

  
  movementDirection = () => {
    if (this.position.z - (ball.current3dPos.z - BAT_THICKNESS) < 0) {
      Game.batDirection = true;
    }
  }
}