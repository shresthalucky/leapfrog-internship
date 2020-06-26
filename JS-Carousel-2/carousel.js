var Carousel = function (carouselId, intervalTime) {

  var self = this;

  this.carouselContainer = document.getElementById(carouselId);
  this.carouselWrapper = this.carouselContainer.querySelector('.carousel-image-wrapper');

  // get image elements in carousel wrapper 
  this.images = this.carouselWrapper.children;
  this.totalImages = this.images.length;

  // default transition of carousel
  this.percentage = 5;
  this.animationId;

  // active default to first image
  this.activeIndex = 0;
  this.activeImage = this.images[this.activeIndex];
  this.activeImage.setAttribute('class', 'active');

  // slider navigation and indicator elements
  this.prevButton = document.createElement('button');
  this.nextButton = document.createElement('button');
  this.indicatorWrapper = document.createElement('div');

  // auto animate options
  this.intervalTime = intervalTime ? intervalTime : 2000;
  this.isHover = false;

  // assign index to image elements
  for (var i = 0; i < this.totalImages; i++) {
    this.images[i].setAttribute('data-id', i);
  }

  function animate(fromImage, toImage, toDirection) {
    var toImageInitalPosition = toDirection === 'left' ? 100 : -100;
    var fromImageInitialPosition = 0;
    var speed = toDirection === 'left' ? -this.percentage : this.percentage;

    function animateCallback() {
      if (toImageInitalPosition !== 0) {
        toImageInitalPosition += speed;
        fromImageInitialPosition += speed;
        toImage.style.left = toImageInitalPosition + '%';
        fromImage.style.left = fromImageInitialPosition + '%';
        requestAnimationFrame(animateCallback);
      } else {
        cancelAnimationFrame(this.animationId);
        toImage.classList.remove('right', 'left');
        toImage.removeAttribute('style');
        fromImage.removeAttribute('class');
        fromImage.removeAttribute('style');
        refreshIndicator.call(self);
      }
    }

    this.animationId = requestAnimationFrame(animateCallback.bind(this));
  }

  function slideLeft() {
    var toLeft = this.images[this.activeIndex];
    var nextIndex = this.activeIndex + 1;

    nextIndex %= this.totalImages;
    var toActive = this.images[nextIndex];

    toActive.classList.add('active', 'right');
    animate.call(self, toLeft, toActive, 'left');
    this.activeIndex = nextIndex;
  }

  function slideRight() {
    var toRight = this.images[this.activeIndex];
    var nextIndex = this.activeIndex - 1;

    if (nextIndex < 0) {
      nextIndex = this.totalImages + nextIndex;
    }

    var toActive = this.images[nextIndex];
    toActive.classList.add('active', 'left');
    animate.call(self, toRight, toActive, 'right');
    this.activeIndex = nextIndex;
  }

  function renderNavigationButtons() {
    this.prevButton.classList.add('carousel-btn', 'prev');
    this.prevButton.innerHTML = '&#10094';
    this.carouselContainer.appendChild(this.prevButton);

    this.nextButton.classList.add('carousel-btn', 'next');
    this.nextButton.innerHTML = '&#10095'
    this.carouselContainer.appendChild(this.nextButton);
  }

  this.prevButton.onclick = slideRight.bind(self);
  this.nextButton.onclick = slideLeft.bind(self);

  function renderIndicators() {
    this.indicatorWrapper.classList.add('carousel-indicator');
    this.carouselContainer.appendChild(this.indicatorWrapper);

    for (var i = 0; i < this.totalImages; i++) {
      var indicator = document.createElement('div');
      indicator.classList.add('indicator');
      indicator.setAttribute('data-id', i);
      this.indicatorWrapper.appendChild(indicator);
    }
  }

  function refreshIndicator() {

    if (this.indicatorWrapper.querySelector('.active')) {
      this.indicatorWrapper.querySelector('.active').classList.remove('active');
    }

    var activeIndicator = this.images[this.activeIndex].getAttribute('data-id');
    this.indicatorWrapper.children.item(activeIndicator).classList.add('active');
  }

  this.indicatorWrapper.onclick = function (event) {
    if (event.srcElement.classList.contains('indicator')) {
      var clickedIndex = parseInt(event.srcElement.getAttribute('data-id'));
      var clickedImage = self.images[clickedIndex];

      if (!clickedImage.classList.contains('active')) {
        var direction = (clickedIndex - self.activeIndex) > 0 ? 'left' : 'right';
        clickedImage.classList.add('active', 'right');
        animate.call(self, self.images[self.activeIndex], clickedImage, direction);
        self.activeIndex = clickedIndex;
      }
    }
  }

  function autoAnimate() {
    this.autoAnimateInterval = setInterval(function () {
      if (!self.isHover) slideLeft.call(self);
    }, self.intervalTime);
  }

  this.changeAnimationInterval = function (time) {
    clearInterval(self.autoAnimateInterval);
    self.intervalTime = time;
    autoAnimate.call(self);
  }

  this.carouselContainer.onmouseover = function () {
    self.isHover = true;
  }

  this.carouselContainer.onmouseout = function () {
    self.isHover = false;
  }

  this.render = function () {
    renderNavigationButtons.call(self);
    renderIndicators.call(self);
    refreshIndicator.call(self);
    autoAnimate.call(self);
  }

}