function init() {
  const canvas = document.getElementById('game');

  const ctx = canvas.getContext('2d');
  canvas.width = 600;
  canvas.height = 600;

  const CANVAS_WIDTH = canvas.width;
  const CANVAS_HEIGHT = canvas.height;

  const SEP = 4;
  const LANE_WIDTH = (CANVAS_WIDTH / 3) - SEP;

  const CAR_WIDTH = 80;
  const CAR_HEIGHT = 100;

  const CAR_START = (LANE_WIDTH - CAR_WIDTH) / 2;

  const firstLane = new Lane(new Position(0, 0), new Position(LANE_WIDTH, CANVAS_HEIGHT), LANE_WIDTH);
  const secondLane = new Lane(new Position(LANE_WIDTH + SEP, 0), new Position(2 * LANE_WIDTH + SEP, CANVAS_HEIGHT), LANE_WIDTH);
  const thirdLane = new Lane(new Position(2 * LANE_WIDTH + 2 * SEP, 0), new Position(CANVAS_WIDTH, CANVAS_HEIGHT), LANE_WIDTH);

  const laneSep1 = new LaneSeparator(new Position(LANE_WIDTH, 0), new Position(LANE_WIDTH + SEP, CANVAS_HEIGHT), SEP);
  const laneSep2 = new LaneSeparator(new Position(2 * LANE_WIDTH + SEP, 0), new Position(2 * LANE_WIDTH + 2 * SEP, CANVAS_HEIGHT), SEP);

  const PLAYER_CAR_INITIAL = new Position(secondLane.position.start.x + CAR_START, CANVAS_HEIGHT - CAR_HEIGHT);

  const playerCar = new Car(PLAYER_CAR_INITIAL, CAR_WIDTH, CAR_HEIGHT);

  const initialCarX = [
    firstLane.position.start.x + CAR_START,
    secondLane.position.start.x + CAR_START,
    thirdLane.position.start.x + CAR_START
  ]

  const opponentCar = new Car(new Position(initialCarX[0], 0), CAR_WIDTH, CAR_HEIGHT);

  // firstLane.draw(ctx);
  // laneSep1.draw(ctx);
  // secondLane.draw(ctx);
  // laneSep2.draw(ctx);
  // thirdLane.draw(ctx);

  // playerCar.draw(ctx);
  // opponentCar.draw(ctx);


  function play() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    firstLane.draw(ctx);
    laneSep1.draw(ctx);
    secondLane.draw(ctx);
    laneSep2.draw(ctx);
    thirdLane.draw(ctx);

    playerCar.draw(ctx);
    opponentCar.moveDown();
    opponentCar.draw(ctx);
    requestAnimationFrame(play);
  }

  requestAnimationFrame(play);


  document.addEventListener('keydown', (event) => {

    let key = event.key;

    // if car in first lane
    if (playerCar.position.start.x === initialCarX[0]) {

    }

    // if car in second lane
    if (playerCar.position.start.x === initialCarX[1]) {

    }

    // if car in third lane
    if (playerCar.position.start.x === initialCarX[1]) {

    }
  });

}

init();