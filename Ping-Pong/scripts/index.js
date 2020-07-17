const canvas = document.getElementById('game');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const ctx = canvas.getContext('2d');

const App = {
  'state': STATE_INIT,
  'assets': {
    'src': 'assets/',
    'total': 6,
    'loadCount': 0
  }
}

function run() {
  switch (App.state) {
    case STATE_INIT:
      initAssets();
      break;
    case STATE_LOADING:
      break;
    case STATE_LOADED:
      displayIntro();
      break;
  }
}

function initAssets() {

  App.state = STATE_LOADING;

  sprite = new Image();
  sprite.src = App.assets.src + 'sprite.png';
  sprite.onload = loadComplete;

  bounceIn = document.createElement('audio');
  document.body.appendChild(bounceIn);
  bounceIn.addEventListener('canplaythrough', loadComplete);
  bounceIn.setAttribute('src', App.assets.src + 'sounds/bounce1.mp3');

  bounceOut = document.createElement('audio');
  document.body.appendChild(bounceOut);
  bounceOut.addEventListener('canplaythrough', loadComplete);
  bounceOut.setAttribute('src', App.assets.src + 'sounds/bounce2.mp3');

  batHit = document.createElement('audio');
  document.body.appendChild(batHit);
  batHit.addEventListener('canplaythrough', loadComplete);
  batHit.setAttribute('src', App.assets.src + 'sounds/hit.mp3');

  clapHigh = document.createElement('audio');
  document.body.appendChild(clapHigh);
  clapHigh.addEventListener('canplaythrough', loadComplete);
  clapHigh.setAttribute('src', App.assets.src + 'sounds/clap1.mp3');

  clapLow = document.createElement('audio');
  document.body.appendChild(clapLow);
  clapLow.addEventListener('canplaythrough', loadComplete);
  clapLow.setAttribute('src', App.assets.src + 'sounds/clap2.mp3');

  run();
}

function loadComplete() {
  App.assets.loadCount++;

  if (App.assets.loadCount >= App.assets.total) {
    App.state = STATE_LOADED;

    bounceIn.removeEventListener('canplaythrough', loadComplete);
    bounceOut.removeEventListener('canplaythrough', loadComplete);
    batHit.removeEventListener('canplaythrough', loadComplete);
    clapHigh.removeEventListener('canplaythrough', loadComplete);
    clapLow.removeEventListener('canplaythrough', loadComplete);

    run();
  }
}


function displayIntro() {
  loadingElement = document.body.querySelector('.loading');
  introElement = document.body.querySelector('.intro');
  form = introElement.querySelector('form');

  loadingElement.style.display = 'none';
  introElement.style.display = 'block';

  form.addEventListener('submit', (e) => {

    e.preventDefault();

    introElement.style.display = 'none';
    canvas.style.display = 'block';

    const config = {
      'playerName': (e.target.elements.player.value).toUpperCase(),
      'bestOfGames': parseInt(e.target.elements.bestof.value)
    }

    initGame(config);
  });
}


function initGame(config) {
  projection.camera.position.x = HALF_CANVAS_WIDTH;
  projection.viewplane.x = HALF_CANVAS_WIDTH;

  const ballStartPosition = new Position(HALF_CANVAS_WIDTH, BOARD_Y - BALL_START_HEIGHT, BOARD_Z);
  const playerPosition = new Position(0, BOARD_Y - BALL_START_HEIGHT, PLAYER_Z_POSITION);
  const opponentPosition = new Position(1000, BOARD_Y - BALL_START_HEIGHT, OPPONENT_Z_POSITION);
  const scoreboardPosition = new Position(20, 20);

  floor = new Floor();
  walls = new Wall();
  table = new Board();
  net = new Net();
  ball = new Ball(ballStartPosition);
  player = new User(playerPosition);
  opponent = new Opponent(opponentPosition);
  scoreboard = new Scoreboard(scoreboardPosition, player, config);

  floor.draw();
  walls.draw();
  table.draw();
  net.draw();

  initEvents();

  animationId = requestAnimationFrame(renderGame);
}

function initEvents() {

  document.addEventListener('mousemove', (e) => {
    player.handleBatMovement(e);
  });

  document.addEventListener('keyup', (e) => {

    if (e.key === 'Escape') {
      Game.state.pause = !Game.state.pause;

      if (Game.state.pause) {
        cancelAnimationFrame(animationId);
      } else {
        animationId = requestAnimationFrame(renderGame);
      }
    }
  });
}

run();