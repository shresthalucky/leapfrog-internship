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
}

const projection = {
  'camera': {
    'position': new Position(0, -600, -200),
    'orientation': { 'thetaX': 0, 'thetaY': 0, 'thetaZ': 0 }
  },

  'viewplane': new Position(0, 0, 500),

  'get2dProjection': (position3d) => {
    let d = position3d.subtract(projection.camera.position);

    let sin = {
      'x': Math.sin(projection.camera.orientation.thetaX),
      'y': Math.sin(projection.camera.orientation.thetaY),
      'z': Math.sin(projection.camera.orientation.thetaZ)
    }

    let cos = {
      'x': Math.cos(projection.camera.orientation.thetaX),
      'y': Math.cos(projection.camera.orientation.thetaY),
      'z': Math.cos(projection.camera.orientation.thetaZ)
    }

    let dx = cos.y * (sin.z * d.y + cos.z * d.x) - (sin.y * d.z);
    let dy = sin.x * (cos.y * d.z + sin.y * (sin.z * d.y + cos.z * d.x)) + cos.x * (cos.z * d.y - sin.z * d.x);
    let dz = cos.x * (cos.y * d.z + sin.y * (sin.z * d.y + cos.z * d.x)) - sin.x * (cos.z * d.y - sin.z * d.x);

    let vz = projection.viewplane.z / dz;
    let bx = vz * dx + projection.viewplane.x;
    let by = vz * dy + projection.viewplane.y;

    return new Position(bx, by);
  }

}

const ENV = {
  'gravity': 9.82
}