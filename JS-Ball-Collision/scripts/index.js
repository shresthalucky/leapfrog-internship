function init() {
  var canvas = document.getElementById('main-canvas');
  
  /** @type {CanvasRenderingContext2D} */
  var ctx = canvas.getContext('2d');
  canvas.height = document.body.clientHeight;
  canvas.width = document.body.clientWidth;
}

init();