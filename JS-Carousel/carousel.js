var carouselContainer = document.querySelector('.carousel-container');
var carouselWrapper = document.querySelector('.carousel-image-wrapper');

var images = carouselWrapper.children;
var totalImages = images.length;

// active default to first image
var activeIndex = 0;
var activeImage = images[activeIndex];
activeImage.setAttribute('class', 'active');

for (var i = 0; i < totalImages; i++) {
  images[i].setAttribute('data-id', i);
}

function slideLeft() {
  var toLeft = images[activeIndex];

  var nextIndex = activeIndex + 1;

  nextIndex %= totalImages;
  var toActive = images[nextIndex];

  toActive.classList.add('active', 'right');

  setTimeout(function () {
    toActive.classList.remove('right');
    toLeft.classList.add('left', 'inactive');
    toLeft.classList.remove('active');
  }, 100)

  setTimeout(function () {
    toLeft.removeAttribute('class');
    activeIndex = nextIndex;
    refreshIndicator();
  }, 600);
}

function slideRight() {
  var toRight = images[activeIndex];

  var nextIndex = activeIndex - 1;

  if (nextIndex < 0) {
    nextIndex = totalImages + nextIndex;
  }

  var toActive = images[nextIndex];

  toActive.classList.add('active', 'left');

  setTimeout(function () {
    toActive.classList.remove('left');
    toRight.classList.add('right', 'inactive');
    toRight.classList.remove('active');
  }, 100)

  setTimeout(function () {
    toRight.removeAttribute('class');
    activeIndex = nextIndex;
    refreshIndicator();
  }, 600);
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
  indicator.setAttribute('data-id', i);
  indicatorWrapper.appendChild(indicator);
}

function refreshIndicator() {

  if (indicatorWrapper.querySelector('.active')) {
    indicatorWrapper.querySelector('.active').classList.remove('active');
  }

  var activeIndicator = carouselWrapper.children[activeIndex].getAttribute('data-id');
  indicatorWrapper.children.item(activeIndicator).classList.add('active');
}

refreshIndicator();

indicatorWrapper.onclick = function (event) {
  if (event.srcElement.classList.contains('indicator')) {
    var clickedIndex = Number(event.srcElement.getAttribute('data-id'));
    var clickedImage = images[clickedIndex];

    if (!clickedImage.classList.contains('active')) {

      images[activeIndex].removeAttribute('class');
      clickedImage.classList.add('active');

      activeIndex = clickedIndex;
      refreshIndicator();
    }
  }
}