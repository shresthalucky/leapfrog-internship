const ENV = {
  'gravity': 9.82,
  'toRadian': (deg) => {
    return deg * Math.PI / 180;
  },
  // 'startBoardZ': 160
  'startY': -120
}
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

  // reflectXAxis = () => {
  //   return new Position(this.x, -this.y, this.z);
  // }
}

const projection = {
  'camera': {
    'position': new Position(0, -700, -300),
    'orientation': { 'thetaX': 0, 'thetaY': 0, 'thetaZ': 0 }
  },

  'viewplane': new Position(0, 0, 500),

  'get2dProjection': (position3d) => {
    let d = position3d.subtract(projection.camera.position);

    // let sin = {
    //   'x': Math.sin(projection.camera.orientation.thetaX),
    //   'y': Math.sin(projection.camera.orientation.thetaY),
    //   'z': Math.sin(projection.camera.orientation.thetaZ)
    // }

    // let cos = {
    //   'x': Math.cos(projection.camera.orientation.thetaX),
    //   'y': Math.cos(projection.camera.orientation.thetaY),
    //   'z': Math.cos(projection.camera.orientation.thetaZ)
    // }

    // let yx = sin.z * d.y + cos.z * d.x;

    // let dx = cos.y * yx - (sin.y * d.z);
    // let dy = sin.x * (cos.y * d.z + sin.y * yx) + cos.x * (cos.z * d.y - sin.z * d.x);
    // let dz = cos.x * (cos.y * d.z + sin.y * yx) - sin.x * (cos.z * d.y - sin.z * d.x);

    let vz = projection.viewplane.z / d.z;
    let bx = vz * d.x + projection.viewplane.x;
    let by = vz * d.y + projection.viewplane.y;

    return new Position(bx, by);
  },

  'get3dPosition': (bx, by) => {

    let dy = ENV.startY - projection.camera.position.y;
    let dz = projection.viewplane.z * dy / (by - projection.viewplane.y);
    let dx = ((bx - projection.viewplane.x) * dz / projection.viewplane.z);

    let ax = projection.camera.position.x + dx;
    let ay = projection.camera.position.y + dy;
    let az = projection.camera.position.z + dz;

    // console.log(ax, ay, az);

    // debugger
    // let dz = ENV.startBoardZ - projection.camera.position.z;
    // let dz = ENV.startBoardZ;

    // let ax = (((bx - projection.viewplane.x) * dz - projection.camera.position.z) / projection.viewplane.z) + projection.camera.position.x;
    // let ay = (((by - projection.viewplane.y) * dz - projection.camera.position.z) / projection.viewplane.z) + projection.camera.position.y;

    return new Position(ax, ay, az);
  }

}