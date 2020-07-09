class Player {
  constructor(position) {
    this.position = new Position(position.x, position.y, position.z);
    this.size = {
      'long': 120,
      'width': 100
    }
    this.halfSize = {
      'long': this.size.long / 2,
      'width': this.size.width / 2
    }

    this.surface3d = {
      'topLeft': new Position(position.x - this.halfSize.width, position.y - this.halfSize.long, position.z),
      'topRight': new Position(position.x + this.halfSize.width, position.y - this.halfSize.long, position.z),
      'bottomRight': new Position(position.x + this.halfSize.width, position.y + this.halfSize.long, position.z),
      'bottomLeft': new Position(position.x - this.halfSize.width, position.y + this.halfSize.long, position.z)
    }

    this.surface2d = {
      'topLeft': projection.get2dProjection(this.surface3d.topLeft),
      'topRight': projection.get2dProjection(this.surface3d.topRight),
      'bottomRight': projection.get2dProjection(this.surface3d.bottomRight),
      'bottomLeft': projection.get2dProjection(this.surface3d.bottomLeft)
    }
  
    // this.surface3d = [
    //   new Position(position.x - this.halfSize.width, position.y - this.halfSize.long, position.z),
    //   new Position(position.x + this.halfSize.width, position.y - this.halfSize.long, position.z), 
    //   new Position(position.x + this.halfSize.width, position.y + this.halfSize.long, position.z),
    //   new Position(position.x - this.halfSize.width, position.y + this.halfSize.long, position.z)
    // ];

    // this.surface2d = this.surface3d.map(projection.get2dProjection);
  }

  drawBat = () => {

    let height = this.surface2d.topLeft.get2dDistance(this.surface2d.bottomLeft);
    let width = this.surface2d.topRight.get2dDistance(this.surface2d.topLeft);

    ctx.beginPath();
    ctx.rect(this.surface2d.topLeft.x,this.surface2d.topLeft.y, width, height);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
  }

}