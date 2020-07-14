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

// colors
const BOARD_BACKGROUND = '#4879BC';
const BLACK_A = '#000000';
const BLACK_B = '#212121';
const BLACK_C = '#424242';
const WHITE = '#FFFFFF';

// board constants
const TABLE_HEIGHT = 300;
const TABLE_STAND_PADDING = 40;
const BOARD_WIDTH = 800;
const BOARD_LENGTH = BOARD_WIDTH * 6 / 5;
const BOARD_HALF_LENGTH = BOARD_LENGTH / 2;
const BOARD_THICKNESS = 20;
const BOARD_Y = 0;
const BOARD_Z = 160;
const BORDER_WIDTH = 10;
const BOARD_OFFSET = 160;
const NET_HEIGHT = 90;

// ball constants and defaults
const BALL_START_HEIGHT = 100; // vertical height from the board
const BALL_MAX_RADIUS = 16;
const BALL_MIN_RADIUS = 6;
const BALL_ANGLE = ENV.toRadian(30);
const BALL_INITAL_VEL = 100;
const SLOPE = (BALL_MIN_RADIUS - BALL_MAX_RADIUS) / (BOARD_LENGTH - BOARD_Z);

// bat constants and defaults
const BAT_LENGTH = 150;
const BAT_WIDTH = 120;
const BAT_THICKNESS = 50;
const BAT_INITIAL_Z = 120;

// player constants and defaults
const PLAYER_Z_POSITION = BOARD_Z - 100;
const OPPONENT_Z_POSITION = BOARD_LENGTH + BOARD_Z; 

// gameplay constants
const SERVE_ANGLE = ENV.toRadian(-45);