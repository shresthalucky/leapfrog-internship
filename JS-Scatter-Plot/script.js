document.body.style.margin = 0;
document.body.style.padding = 0;

var Canvas = function (height, width) {
  this.height = height;
  this.width = width;

  this.element = document.createElement('div');
  this.element.className = 'canvas';
  this.element.style.position = 'relative';
  this.element.style.height = this.height + 'px';
  this.element.style.width = this.width + 'px';
  this.element.style.backgroundColor = '#eee';

  this.render = function () {
    document.body.appendChild(this.element);
  }

  this.getDOM = function () {
    return this.element;
  }
}

var Dot = function (canvas, x, y) {
  this.canvas = canvas;
  this.left = x;
  this.top = y;

  this.element = document.createElement('div');
  this.element.className = 'dot';
  this.element.style.position = 'absolute';
  this.element.style.height = 20 + 'px';
  this.element.style.width = 20 + 'px';
  this.element.style.backgroundColor = '#4499cb';
  this.element.style.borderRadius = '50%';
  this.element.style.top = this.top + 'px';
  this.element.style.left = this.left + 'px';

  this.plot = function () {
    canvas.appendChild(this.element);
  }

  function fillColor() {
    this.style.backgroundColor = 'rgb('
      + Math.random() * 255 + ','
      + Math.random() * 255 + ','
      + Math.random() * 255 + ')';
  }

  this.element.addEventListener('click', fillColor.bind(this.element));

}

var mainCanvas = new Canvas(500, 500);
var mainCanvasElement = mainCanvas.getDOM();
mainCanvas.render();

var messageElement = document.createElement('p');
messageElement.innerHTML = 'Start plotting by clicking!';
document.body.appendChild(messageElement);

var spacing = 20; // height and width of dot
var actualCanvasHeight = mainCanvas.height - spacing;
var actualCanvasWidth = mainCanvas.width - spacing;

document.addEventListener('mousedown', function (event) {
  if (event.clientY < actualCanvasHeight && event.clientX < actualCanvasWidth) {
    var dot = new Dot(mainCanvasElement, event.clientX, event.clientY);
    dot.plot();
  }
});

