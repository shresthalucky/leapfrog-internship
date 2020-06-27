var Carousel = function (carouselId, intervalTime, transitionTime, startImage) {

  var self = this;

  this.carouselContainer = document.getElementById(carouselId);
  this.carouselWrapper = this.carouselContainer.querySelector('.carousel-image-wrapper');

  // get image elements in carousel wrapper 
  this.images = this.carouselWrapper.children;
  this.totalImages = this.images.length;

  // default transition of carousel
  this.transitionTime = (transitionTime === undefined) ? 1000 : transitionTime;
  this.percentage = 100 / this.transitionTime;
  this.animationId;

  // active default to first image
  this.activeIndex = (startImage === undefined) ? 0
    : (startImage - 1 <= this.totalImages && startImage - 1 > 0) ? startImage - 1 : 0;
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
    var startTime;

    function animateCallback(now) {

      if (startTime === undefined)
        startTime = now;

      var elapsedTime = now - startTime;
      if (elapsedTime <= self.transitionTime) {
        fromImageInitialPosition = speed * elapsedTime;
        toImage.style.left = toImageInitalPosition + fromImageInitialPosition + '%';
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

  // this.prevButton.onclick = slideRight.bind(self);
  // this.nextButton.onclick = slideLeft.bind(self);

  this.prevButton.onclick = function (event) {
    if (event.detail === 1) slideRight.call(self);
  }

  this.nextButton.onclick = function (event) {
    if (event.detail === 1) slideLeft.call(self);
  }

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
    // autoAnimate.call(self);
  }

}