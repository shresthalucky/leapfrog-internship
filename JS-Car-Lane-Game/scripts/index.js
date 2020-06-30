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

  let rafId;
  
  const initialCarX = [
    firstLane.position.start.x + CAR_START,
    secondLane.position.start.x + CAR_START,
    thirdLane.position.start.x + CAR_START
  ]

  let currentLane = 1;

  const PLAYER_CAR_INITIAL = new Position(initialCarX[currentLane], CANVAS_HEIGHT - CAR_HEIGHT);
  const playerCar = new Car(PLAYER_CAR_INITIAL, CAR_WIDTH, CAR_HEIGHT);

  const opponentCar = new Car(new Position(initialCarX[0], 0), CAR_WIDTH, CAR_HEIGHT);

  // firstLane.draw(ctx);
  // laneSep1.draw(ctx);
  // secondLane.draw(ctx);
  // laneSep2.draw(ctx);
  // thirdLane.draw(ctx);

  // playerCar.draw(ctx);
  // opponentCar.draw(ctx);

  function gameOver() {
    console.log('game over');
  }

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
    
    if (playerCar.checkCollision(opponentCar)) {
      cancelAnimationFrame(rafId);
      gameOver();
    } else {
      requestAnimationFrame(play);
    }
  }

  rafId = requestAnimationFrame(play);


  document.addEventListener('keydown', (event) => {

    let key = event.key;

    if (key === 'a') {
      if(currentLane !== 0) {
        currentLane -= 1;
        playerCar.position.start.x = initialCarX[currentLane];
      }
    } else if (key === 'd') {
      if (currentLane !== 2) {
        currentLane += 1;
        playerCar.position.start.x = initialCarX[currentLane];
      } 
    }

  });

}

init();