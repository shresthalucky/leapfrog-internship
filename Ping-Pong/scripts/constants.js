const STATE_INIT = 1;
const STATE_LOADING = 2;
const STATE_LOADED = 3;

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
const HALF_CANVAS_WIDTH = CANVAS_WIDTH / 2;

// colors
const BOARD_BACKGROUND = '#4879BC';
const BALL_BACKGROUND = '#FFD740';
const BALL_BORDER = '#FFC400';
const BLACK_A = '#000000';
const BLACK_B = '#212121';
const BLACK_C = '#424242';
const WHITE = '#FFFFFF';

// board constants
const TABLE_HEIGHT = 0;
const TABLE_STAND_PADDING = 40;
const BOARD_WIDTH = 800;
const BOARD_LENGTH = BOARD_WIDTH * 6 / 5;
const BOARD_HALF_LENGTH = BOARD_LENGTH / 2;
const BOARD_HALF_WIDTH = BOARD_WIDTH / 2;
const BOARD_THICKNESS = 20;
const BOARD_LEFT_X = HALF_CANVAS_WIDTH - BOARD_HALF_WIDTH;
const BOARD_RIGHT_X = HALF_CANVAS_WIDTH + BOARD_HALF_WIDTH;
const BOARD_Y = -300;
const BOARD_Z = 160;
const BORDER_WIDTH = 10;
const BOARD_OFFSET = 160;
const BOARD_END = BOARD_LENGTH + BOARD_Z;
const NET_HEIGHT = 90;
const NET_Z = BOARD_Z + BOARD_HALF_LENGTH;

// ball constants and defaults
const BALL_START_HEIGHT = 100; // vertical height from the board
const BALL_MAX_RADIUS = 14;
const BALL_MIN_RADIUS = 6;
const BALL_ANGLE = ENV.toRadian(30);
const BALL_INITAL_VEL = 100;
const SLOPE = (BALL_MIN_RADIUS - BALL_MAX_RADIUS) / (BOARD_LENGTH - BOARD_Z);
const TIME = 0.22;

// bat constants and defaults
const BAT_LENGTH = 207;
const BAT_WIDTH = 124;
const BAT_THICKNESS = 50;
const BAT_INITIAL_Z = 120;

// player constants and defaults
const PLAYER_Z_POSITION = BOARD_Z - 100;
const OPPONENT_Z_POSITION = BOARD_LENGTH + BOARD_Z;
const BOUNDARY_PADDING = 100;

// gameplay constants
const SERVE_ANGLE = ENV.toRadian(-45);
const VELOCITY = 80;

//background constants
const LEFT_WALL = HALF_CANVAS_WIDTH - BOARD_WIDTH * 2;
const RIGHT_WALL = HALF_CANVAS_WIDTH + BOARD_WIDTH * 2;
const END_WALL = BOARD_END + BOARD_WIDTH * 2;