class Player {
  constructor(position) {
    this.position = new Position(position.x, position.y, position.z);
    this.size = {
      'long': 150,
      'width': 120
    }
    this.halfSize = {
      'long': this.size.long / 2,
      'width': this.size.width / 2
    }

    this.surface3d;
    this.surface2d;

    // this.surface3d = [
    //   new Position(position.x - this.halfSize.width, position.y - this.halfSize.long, position.z),
    //   new Position(position.x + this.halfSize.width, position.y - this.halfSize.long, position.z), 
    //   new Position(position.x + this.halfSize.width, position.y + this.halfSize.long, position.z),
    //   new Position(position.x - this.halfSize.width, position.y + this.halfSize.long, position.z)
    // ];

    // this.surface2d = this.surface3d.map(projection.get2dProjection);
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
    
    let height = this.surface2d.topLeft.get2dDistance(this.surface2d.bottomLeft);
    let width = this.surface2d.topRight.get2dDistance(this.surface2d.topLeft);
    
    ctx.beginPath();
    ctx.rect(this.surface2d.topLeft.x, this.surface2d.topLeft.y, width, height);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
  }

  handleBatMovement = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.position = projection.get3dPosition(event.clientX, event.clientY - projection.camera.position.y);
  }

}