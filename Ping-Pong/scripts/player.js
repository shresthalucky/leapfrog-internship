class Player {
  constructor(position) {
    this.position = new Position(position.x, position.y, position.z);
    this.size = {
      'long': BAT_LENGTH,
      'width': BAT_WIDTH
    }
    this.halfSize = {
      'long': this.size.long / 2,
      'width': this.size.width / 2
    }

    this.surface3d;
    this.surface2d;
    // this.batThickness = BAT_THICKNESS;
    this.intialX;
  }

  loadSurface = () => {
    this.surface3d = {
      'topLeft': new Position(this.position.x - this.halfSize.width, this.position.y - this.halfSize.long, this.position.z),
      'topRight': new Position(this.position.x + this.halfSize.width, this.position.y - this.halfSize.long, this.position.z),
      'bottomRight': new Position(this.position.x + this.halfSize.width, this.position.y + this.halfSize.long, this.position.z),
      'bottomLeft': new Position(this.position.x - this.halfSize.width, this.position.y + this.halfSize.long, this.position.z)
    }

    this.surface2d = {
      'topLeft': projection.get2dProjection(this.surface3d.topLeft),
      'topRight': projection.get2dProjection(this.surface3d.topRight),
      'bottomRight': projection.get2dProjection(this.surface3d.bottomRight),
      'bottomLeft': projection.get2dProjection(this.surface3d.bottomLeft)
    }
  }

  drawBat = () => {

    this.loadSurface();
    this.setInitialX();

    let height = this.surface2d.topLeft.get2dDistance(this.surface2d.bottomLeft);
    let width = this.surface2d.topRight.get2dDistance(this.surface2d.topLeft);

    ctx.beginPath();
    ctx.rect(this.surface2d.topLeft.x, this.surface2d.topLeft.y, width, height);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
  }

  setInitialX = () => {
    if (this.position.z <= BAT_INITIAL_Z) {
      this.intialX = this.position.x;
    }
  }

  handleBatMovement = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.position = projection.get3dPosition(event.clientX, event.clientY);
    // this.position = projection.get3dPosition(event.clientX, event.clientY - projection.camera.position.y);
    this.fitToCourt();
  }

  fitToCourt = () => {
    if (this.position.x > table.surface3d.outer[1].x - BALL_MAX_RADIUS) {
      this.position.x = table.surface3d.outer[1].x - BALL_MAX_RADIUS;
    }

    if (this.position.x < table.surface3d.outer[0].x + BALL_MAX_RADIUS) {
      this.position.x = table.surface3d.outer[0].x + BALL_MAX_RADIUS;
    }

    if (this.position.z > BOARD_Z + BOARD_HALF_LENGTH) {
      this.position.z = BOARD_Z + BOARD_HALF_LENGTH;
    }
  }

  getHitAngle = () => {
    let finalPosition = this.position;
    let dz = BOARD_Z - BAT_INITIAL_Z;
    let dx = finalPosition.x - this.intialX;

    return Math.atan(dz / dx);
  }

  movementDirection = () => {
    if (this.position.z - (ball.current3dPos.z - BAT_THICKNESS) < 0) {
      Game.batDirection = true;
    }
  }

}