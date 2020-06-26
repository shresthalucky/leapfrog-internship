var carouselContainer = document.querySelector('.carousel-container');
var carouselWrapper = document.querySelector('.carousel-image-wrapper');

var images = carouselWrapper.children;
var totalImages = images.length;
var animationId;
var percentage = 5;

// active default to first image
var activeIndex = 0;
var activeImage = images[activeIndex];
activeImage.setAttribute('class', 'active');

for (var i = 0; i < totalImages; i++) {
  images[i].setAttribute('data-id', i);
}

function animate(fromImage, toImage, toDirection) {

  var toImageInitalPosition = toDirection === 'left' ? 100 : -100;
  var fromImageInitialPosition = 0;
  var speed = toDirection === 'left' ? -percentage : percentage;

  function animateCallback() {
    if (toImageInitalPosition !== 0) {
      toImageInitalPosition += speed;
      fromImageInitialPosition += speed;
      toImage.style.left = toImageInitalPosition + '%';
      fromImage.style.left = fromImageInitialPosition + '%';
      requestAnimationFrame(animateCallback);
    } else {
      cancelAnimationFrame(animationId);
      toImage.classList.remove('right', 'left');
      toImage.removeAttribute('style');
      fromImage.removeAttribute('class');
      fromImage.removeAttribute('style');
      refreshIndicator();
    }
  }

  animationId = requestAnimationFrame(animateCallback);
}

function slideLeft() {

  var toLeft = images[activeIndex];
  var nextIndex = activeIndex + 1;

  nextIndex %= totalImages;
  var toActive = images[nextIndex];

  toActive.classList.add('active', 'right');

  animate(toLeft, toActive, 'left');

  activeIndex = nextIndex;
}

function slideRight() {

  var toRight = images[activeIndex];
  var nextIndex = activeIndex - 1;

  if (nextIndex < 0) {
    nextIndex = totalImages + nextIndex;
  }

  var toActive = images[nextIndex];

  toActive.classList.add('active', 'left');

  animate(toRight, toActive, 'right');

  activeIndex = nextIndex;
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
      clickedImage.classList.add('active', 'right');
      animate(images[activeIndex], clickedImage, 'left');
      activeIndex = clickedIndex;
    }
  }
}