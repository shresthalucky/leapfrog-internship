var carouselContainer = document.querySelector('.carousel-container');
var carouselWrapper = document.querySelector('.carousel-image-wrapper');

var images = carouselWrapper.children;
var totalImages = images.length;

var activeIndex = 1;
var activeIndicator = 1;
var activeImage = images[activeIndex];
activeImage.classList.add('active');

function slideLeft() {
  var imageList = carouselWrapper.children;
  var toLeft = imageList[activeIndex];
  var toActive = imageList[activeIndex + 1];
  var toEnd = imageList[activeIndex - 1];

  toActive.classList.add('active', 'right');

  setTimeout(function () {
    toActive.classList.remove('right');
    toLeft.classList.add('left', 'inactive');
    toLeft.classList.remove('active');
  }, 100)

  setTimeout(function () {
    toLeft.classList.remove('left', 'inactive');
    carouselWrapper.removeChild(toEnd);
    carouselWrapper.appendChild(toEnd);
  }, 600);

  activeIndicator++;
  activeIndicator %= totalImages;
  refreshIndicator();
}

function slideRight() {
  var imageList = carouselWrapper.children;
  var toRight = imageList[activeIndex];
  var toActive = imageList[activeIndex - 1];
  var toTop = imageList[totalImages - 1];

  toActive.classList.add('active', 'left');

  setTimeout(function () {
    toActive.classList.remove('left');
    toRight.classList.add('right', 'inactive');
    toRight.classList.remove('active');
  }, 100)

  setTimeout(function () {
    toRight.classList.remove('right', 'inactive');
    carouselWrapper.removeChild(toTop);
    carouselWrapper.prepend(toTop);
  }, 600);

  activeIndicator--;
  if (activeIndicator < 0) {
    activeIndicator = totalImages + activeIndicator;
  }

  refreshIndicator();
}

var prevButton = document.createElement('button');
prevButton.classList.add('carousel-btn', 'prev');
prevButton.innerHTML = '&#10094';
carouselContainer.appendChild(prevButton);

var nextButton = document.createElement('button');
nextButton.classList.add('carousel-btn', 'next');
nextButton.innerHTML = '&#10095'
carouselContainer.appendChild(nextButton);

prevButton.onclick = slideRight;
nextButton.onclick = slideLeft;

var indicatorWrapper = document.createElement('div');
indicatorWrapper.classList.add('carousel-indicator');

carouselContainer.appendChild(indicatorWrapper);

for (var i = 0; i < totalImages; i++) {
  var indicator = document.createElement('div');
  indicator.classList.add('indicator');
  indicatorWrapper.appendChild(indicator);
}

function refreshIndicator() {
  if (indicatorWrapper.querySelector('.active')) {
    indicatorWrapper.querySelector('.active').classList.remove('active');
  }
  indicatorWrapper.children.item(activeIndicator).classList.add('active');
}

refreshIndicator();

var isOverCarousel = false;
var autoScroll = setInterval(function () {
  if (!isOverCarousel) slideLeft();
}, 2000);

carouselContainer.onmouseover = function () {
  isOverCarousel = true;
}

carouselContainer.onmouseout = function () {
  isOverCarousel = false;
}