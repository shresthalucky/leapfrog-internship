// environment constants
const ENV = {
  'gravity': 9.82,
  'toRadian': (deg) => {
    return deg * Math.PI / 180;
  }
}

// canvas constants
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;

// board constants
const TABLE_HEIGHT = 200;
const BOARD_WIDTH = 800;
const BOARD_LENGTH = BOARD_WIDTH * 6 / 5;
const BOARD_THICKNESS = 20;
const BOARD_Y = 0;
const BOARD_Z = 160;
const BORDER_WIDTH = 10;

// ball constants and defaults
const BALL_START_HEIGHT = 120; // vertical height from the board
const BALL_MAX_RADIUS = 18;
const BALL_MIN_RADIUS = 8;
const BALL_ANGLE = ENV.toRadian(30);
const BALL_INITAL_VEL = 100;
const SLOPE = (BALL_MIN_RADIUS - BALL_MAX_RADIUS) / (BOARD_LENGTH - BOARD_Z);

// bat constants and defaults
const BAT_LENGTH = 150;
const BAT_WIDTH = 120;
const BAT_THICKNESS = 50;

// player constants and defaults
const PLAYER_Z_POSITION = BOARD_Z - 100;
const OPPONENT_Z_POSITION = BOARD_LENGTH + BOARD_Z; 

// gameplay constants
const SERVE_ANGLE = ENV.toRadian(-45);