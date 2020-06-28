var Carousel = function (carouselId) {

  var self = this;

  this.carouselContainer = document.getElementById(carouselId);
  this.carouselWrapper = this.carouselContainer.querySelector('.carousel-image-wrapper');

  // get image elements in carousel wrapper 
  this.images = this.carouselWrapper.children;
  this.totalImages = this.images.length;

  // default transition of carousel
  this.transitionTime;
  this.percentPerFrame;
  this.animationId;
  this.WIDTH = 100;
  this.TRANSITION_TIME = 500;
  this.INTERVAL_TIME = 2000;

  // active default to first image
  this.activeIndex;
  this.activeImage;

  // slider navigation and indicator elements
  this.prevButton = document.createElement('button');
  this.nextButton = document.createElement('button');
  this.indicatorWrapper = document.createElement('div');

  // auto animate options
  this.intervalTime;
  this.intervalId;
  this.isHover;

  // assign index to image elements
  for (var i = 0; i < this.totalImages; i++) {
    this.images[i].setAttribute('data-id', i);
  }

  // declear all required variables
  this.init = function (config) {
    self.transitionTime = config.transitionTime ? config.transitionTime : self.TRANSITION_TIME;
    self.percentPerFrame = self.WIDTH / self.transitionTime;

    if (config.startImage) {
      self.activeIndex = (config.startImage - 1 <= self.totalImages && config.startImage - 1 > 0) ?
        config.startImage - 1 : 0;
    } else {
      self.activeIndex = 0;
    }

    self.activeImage = self.images[self.activeIndex];
    self.activeImage.setAttribute('class', 'active');
    self.intervalTime = config.intervalTime ? config.intervalTime : self.INTERVAL_TIME;
  }

  // animate from one image to another in specific direction
  function animate(fromImage, toImage, toDirection) {

    navHandler(0); // disable controllers before animation
    
    var toImageInitalPosition = toDirection === 'left' ? self.WIDTH : -self.WIDTH;
    var fromImageInitialPosition = 0;
    var speed = toDirection === 'left' ? -self.percentPerFrame : self.percentPerFrame;
    var startTime;

    function animateCallback(now) {

      if (!startTime) startTime = now;

      var elapsedTime = now - startTime;

      if (elapsedTime <= self.transitionTime) {
        fromImageInitialPosition = speed * elapsedTime;
        toImage.style.left = toImageInitalPosition + fromImageInitialPosition + '%';
        fromImage.style.marginLeft = fromImageInitialPosition + '%';
        requestAnimationFrame(animateCallback);
      } else {
        cancelAnimationFrame(self.animationId);
        toImage.classList.remove('right', 'left');
        toImage.removeAttribute('style');
        fromImage.removeAttribute('class');
        fromImage.removeAttribute('style');
        navHandler(1);
        refreshIndicator.call(self);
      }
    }
    self.animationId = requestAnimationFrame(animateCallback);
  }

  function slideLeft() {
    var toLeft = self.images[self.activeIndex];
    var nextIndex = self.activeIndex + 1;

    nextIndex %= self.totalImages;
    var toActive = self.images[nextIndex];

    toActive.classList.add('active', 'right');
    animate.call(self, toLeft, toActive, 'left');
    self.activeIndex = nextIndex;
  }

  function slideRight() {
    var toRight = self.images[self.activeIndex];
    var nextIndex = self.activeIndex - 1;

    if (nextIndex < 0) {
      nextIndex = self.totalImages + nextIndex;
    }

    var toActive = self.images[nextIndex];
    toActive.classList.add('active', 'left');
    animate.call(self, toRight, toActive, 'right');
    self.activeIndex = nextIndex;
  }

  function renderNavigationButtons() {
    self.prevButton.classList.add('carousel-btn', 'prev');
    self.prevButton.innerHTML = '&#10094';
    self.carouselContainer.appendChild(self.prevButton);

    self.nextButton.classList.add('carousel-btn', 'next');
    self.nextButton.innerHTML = '&#10095'
    self.carouselContainer.appendChild(self.nextButton);
  }

  function renderIndicators() {
    self.indicatorWrapper.classList.add('carousel-indicator');
    self.carouselContainer.appendChild(self.indicatorWrapper);

    for (var i = 0; i < self.totalImages; i++) {
      var indicator = document.createElement('button');
      indicator.classList.add('indicator');
      indicator.setAttribute('data-id', i);
      self.indicatorWrapper.appendChild(indicator);

      indicator.onclick = function (event) {
        var clickedIndex = parseInt(event.target.getAttribute('data-id'));

        if (!event.target.classList.contains('active')) {
          var direction = (clickedIndex - self.activeIndex) > 0 ? 'left' : 'right';
          self.images[clickedIndex].classList.add('active', 'right');
          animate.call(self, self.images[self.activeIndex], self.images[clickedIndex], direction);
          self.activeIndex = clickedIndex;
        }
      }
    }
  }

  this.prevButton.onclick = function (event) {
    if (event.detail === 1) slideRight();
  }

  this.nextButton.onclick = function (event) {
    if (event.detail === 1) slideLeft();
  }

  function refreshIndicator() {
    if (self.indicatorWrapper.querySelector('.active')) {
      self.indicatorWrapper.querySelector('.active').classList.remove('active');
    }

    var activeIndicator = self.images[self.activeIndex].getAttribute('data-id');
    self.indicatorWrapper.children.item(activeIndicator).classList.add('active');
  }

  function navHandler(state) {
    if (state === 0) {
      self.prevButton.disabled = true;
      self.nextButton.disabled = true;
      var indicators = self.indicatorWrapper.children;
      for (var i = 0; i < self.totalImages; i++) {
        indicators[i].disabled = true;
      }

    } else if (state === 1) {
      self.prevButton.disabled = false;
      self.nextButton.disabled = false;
      var indicators = self.indicatorWrapper.children;
      for (var i = 0; i < self.totalImages; i++) {
        indicators[i].disabled = false;
      }
    }
  }

  function autoAnimate() {
    var start;
    var additionalTime = 0;

    function rafInterval(now) {
      if (!start) start = now;
      var elapsed = now - start;
      
      if (elapsed >= self.intervalTime + additionalTime) {
        slideLeft.call(self);
        start = now;
        additionalTime = self.transitionTime;
      }
      if (self.isHover) {
        cancelAnimationFrame(self.intervalId);
      } else {
        requestAnimationFrame(rafInterval);
      }
    }
    self.intervalId = requestAnimationFrame(rafInterval);
  }

  this.carouselContainer.onmouseover = function () {
    self.isHover = true;
  }

  this.carouselContainer.onmouseout = function () {
    self.isHover = false;
    autoAnimate.call(self);
  }

  // render all and start animation
  this.render = function () {
    if (self.totalImages > 1) {
      renderNavigationButtons();
      renderIndicators();
      refreshIndicator();
      autoAnimate();
    }
  }
}