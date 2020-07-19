const canvas = document.getElementById('game');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const ctx = canvas.getContext('2d');

const App = {
  'state': STATE_INIT,
  'assets': {
    'src': 'assets/',
    'total': 7,
    'loadCount': 0
  }
}

function run() {
  switch (App.state) {
    case STATE_INIT:
      initAssets();
      break;
    case STATE_LOADED:
      displayIntro();
      break;
  }
}

function initAssets() {
  sprite = new Image();
  sprite.src = App.assets.src + 'sprite.png';
  sprite.onload = loadComplete;

  referee = document.createElement('audio');
  document.body.appendChild(referee);
  referee.addEventListener('canplaythrough', loadComplete);
  referee.setAttribute('src', App.assets.src + 'sounds/referee.mp3');

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
}

function loadComplete() {
  App.assets.loadCount++;

  if (App.assets.loadCount >= App.assets.total) {
    App.state = STATE_LOADED;

    referee.removeEventListener('canplaythrough', loadComplete);
    bounceIn.removeEventListener('canplaythrough', loadComplete);
    bounceOut.removeEventListener('canplaythrough', loadComplete);
    batHit.removeEventListener('canplaythrough', loadComplete);
    clapHigh.removeEventListener('canplaythrough', loadComplete);
    clapLow.removeEventListener('canplaythrough', loadComplete);

    run();
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  introElement.style.display = 'none';
  layoutElement.style.display = 'none';

  const config = {
    'playerName': (e.target.elements.player.value).toUpperCase(),
    'bestOfGames': parseInt(e.target.elements.bestof.value)
  }

  initGame(config);
}

function displayIntro() {

  initComponents();

  layoutElement = document.body.querySelector('.layout');
  infoElement = document.body.querySelector('.info');
  introElement = document.body.querySelector('.intro');
  form = introElement.querySelector('form');

  infoElement.style.display = 'none';
  introElement.style.display = 'table';

  form.removeEventListener('submit', handleFormSubmit);
  form.addEventListener('submit', handleFormSubmit);
}

function initComponents() {
  ctx.clearRect(-500, -500, CANVAS_WIDTH + 500, CANVAS_HEIGHT + 500);

  projection.camera.position.x = HALF_CANVAS_WIDTH;
  projection.camera.position.y = CANVAS_HEIGHT <= -MAX_CAMERA_Y ? -CANVAS_HEIGHT : MAX_CAMERA_Y;
  projection.viewplane.x = HALF_CANVAS_WIDTH;

  const ballStartPosition = new Position(HALF_CANVAS_WIDTH, BOARD_Y - BALL_START_HEIGHT, BOARD_Z);
  const playerPosition = new Position(0, BOARD_Y - BALL_START_HEIGHT, PLAYER_Z_POSITION);
  const opponentPosition = new Position(1000, BOARD_Y - BALL_START_HEIGHT, OPPONENT_Z_POSITION);

  floor = new Floor();
  walls = new Wall();
  table = new Board();
  net = new Net();
  ball = new Ball(ballStartPosition);
  player = new User(playerPosition);
  opponent = new Opponent(opponentPosition);

  floor.draw();
  walls.draw();
  table.draw();
  net.draw();
}

const escapeHandler = (e) => {
  Game.state.pause = !Game.state.pause;
  if (e.key === 'Escape') {

    if (Game.state.pause) {
      cancelAnimationFrame(animationId);

      layoutElement.style.display = 'block';
      infoElement.style.display = 'table';
      infoElement.querySelector('.content').innerHTML = "Press ESC to pause / resume"

    } else {
      layoutElement.style.display = 'none';
      infoElement.style.display = 'none';
      animationId = requestAnimationFrame(renderGame);
    }
  }
}

const mouseHandler = (e) => player.handleBatMovement(e);

function initEvents() {
  document.removeEventListener('mousemove', mouseHandler);
  document.addEventListener('mousemove', mouseHandler);

  document.removeEventListener('keyup', escapeHandler);
  document.addEventListener('keyup', escapeHandler);
}

function initGame(config) {
  const scoreboardPosition = new Position(20, 20);
  scoreboard = new Scoreboard(scoreboardPosition, player, config, displayWin);
  // scoreboard = new Scoreboard(scoreboardPosition, opponent, config, displayWin);
  
  initEvents();
  referee.play();
  animationId = requestAnimationFrame(renderGame);
}

function displayWin(player) {
  cancelAnimationFrame(animationId);
  const playAgainBtn = document.createElement('button');
  const winText = '<div class="row"><h1>' + player + ' WINS!' + '</h1></div>';
  const content = infoElement.querySelector('.content');

  playAgainBtn.classList.add('btn');
  playAgainBtn.innerText = 'NEW GAME';
  content.innerHTML = innerHTML = winText;
  content.appendChild(playAgainBtn)
  layoutElement.style.display = 'block';
  infoElement.style.display = 'table';

  playAgainBtn.addEventListener('click', () => {
    resetGame();
    displayIntro();
  });
}

run();