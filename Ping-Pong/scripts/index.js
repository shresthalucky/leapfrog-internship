const canvas = document.getElementById('main');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const ctx = canvas.getContext('2d');

let animationId;

let floor;
let walls;
let table;
let net;
let ball;
let player;
let opponent;

const sprite = new Image();
sprite.src = 'assets/sprite.png';

sprite.onload = init;

function init() {
  projection.camera.position.x = HALF_CANVAS_WIDTH;
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

  initEvents();

  animationId = requestAnimationFrame(renderGame);
}

function initEvents() {
  document.addEventListener('mousemove', function (e) {
    player.handleBatMovement(e);
  })
}