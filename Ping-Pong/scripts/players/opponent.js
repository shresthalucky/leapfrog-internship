class Opponent extends Player {
  constructor(position) {
    super(position);
    
    this.selfHalf = {
      'top': BOARD_END,
      'bottom': BOARD_Z + BOARD_HALF_LENGTH,
      'left': BOARD_LEFT_X,
      'right': BOARD_RIGHT_X
    }
  }

  setPosition = (position) => {

    if (!position) {
      let left = BOARD_LEFT_X + BALL_MAX_RADIUS;
      let right = BOARD_RIGHT_X - BALL_MAX_RADIUS;
      let x = (Math.random() * (right - left)) + left;
      let y = BOARD_Y - BALL_START_HEIGHT;

      this.position = new Position(x, y, BOARD_END);
      return this.position;
    }

    this.position = new Position(position.x, position.y, position.z);
    return this.position;
  }

  serve = (velocity) => {
    ball.setPosition(this.position);
    ball.serve(-velocity);
  }

  animate = (destination) => {
    
    let x = this.position.x;
    let z = this.position.z;
    let dx = (destination.x - this.position.x);
    let dz = (destination.z - this.position.z);
    let time = {
      'total': 1500,
      'elapsed': 0
    };

    const getProgress = ({ elapsed, total }) => Math.min(elapsed / total, 1);
    const easeOut = progress => Math.pow(--progress, 5) + 1;

    const easeTranslate = (now) => {

      if (!time.start) {
        time.start = now;
      } else {
        time.elapsed = now - time.start;
      }

      const progress = getProgress(time);
      const easing = easeOut(progress);

      this.position.x = x + dx * easing;
      this.position.z = z + dz * easing;
      if (progress < 1) requestAnimationFrame(easeTranslate);
    }

    requestAnimationFrame(easeTranslate);
  }
}