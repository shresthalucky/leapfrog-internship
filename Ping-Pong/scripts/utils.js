class Position {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  subtract = (position) => {
    let x = this.x - position.x;
    let y = this.y - position.y;
    let z = this.z - position.z;

    return new Position(x, y, z);
  }

  get3dDistance = (position) => {
    let x = this.x - position.x;
    let y = this.y - position.y;
    let z = this.z - position.z;

    return (Math.sqrt(x * x + y * y + z * z));
  }

  get2dDistance = (position) => {
    let x = this.x - position.x;
    let y = this.y - position.y;

    return (Math.sqrt(x * x + y * y));
  }
}

const projection = {
  'camera': {
    'position': new Position(0, -1000, -300)
  },

  'viewplane': new Position(0, 0, 500),

  'get2dProjection': (position3d) => {
    let d = position3d.subtract(projection.camera.position);
    let vz = projection.viewplane.z / d.z;
    let bx = vz * d.x + projection.viewplane.x;
    let by = vz * d.y + projection.viewplane.y;

    return new Position(bx, by);
  },

  'get3dPosition': (bx, by) => {

    let dy = (-BALL_START_HEIGHT + BOARD_Y) - projection.camera.position.y;
    let dz = projection.viewplane.z * dy / (by - projection.viewplane.y);
    let dx = ((bx - projection.viewplane.x) * dz / projection.viewplane.z);

    let ax = projection.camera.position.x + dx;
    let ay = projection.camera.position.y + dy;
    let az = projection.camera.position.z + dz;
    return new Position(ax, ay, az);
  }

}