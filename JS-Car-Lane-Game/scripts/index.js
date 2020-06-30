function init() {
  const ctx = canvas.getContext('2d');
  canvas.width = 558;
  canvas.height = 800;

  const CANVAS_WIDTH = canvas.width;
  const CANVAS_HEIGHT = canvas.height;

  const SEP = 0;
  const LANE_WIDTH = (CANVAS_WIDTH / 3) - SEP;

  const CAR_WIDTH = 80;
  const CAR_HEIGHT = 164;

  const CAR_START = (LANE_WIDTH - CAR_WIDTH) / 2;

  const firstLane = new Lane(new Position(0, 0), new Position(LANE_WIDTH, CANVAS_HEIGHT), LANE_WIDTH, CAR_START);
  const secondLane = new Lane(new Position(LANE_WIDTH + SEP, 0), new Position(2 * LANE_WIDTH + SEP, CANVAS_HEIGHT), LANE_WIDTH, CAR_START);
  const thirdLane = new Lane(new Position(2 * LANE_WIDTH + 2 * SEP, 0), new Position(CANVAS_WIDTH, CANVAS_HEIGHT), LANE_WIDTH, CAR_START);

  const lanes = [firstLane, secondLane, thirdLane];

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

  let recentObs;

  function randomLaneObstacleGenerator() {
    
    let selectLane = Math.floor(Math.random() * 3);
    let lane = lanes[selectLane];

    if (!recentObs){
      recentObs = lane.generateObstacle(CAR_WIDTH, CAR_HEIGHT);
    } else {
      if(recentObs.position.start.y > CAR_HEIGHT * 2) {
        recentObs = lane.generateObstacle(CAR_WIDTH, CAR_HEIGHT);
      }
    }
  }

  function play() {

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    firstLane.draw(ctx);
    laneSep1.draw(ctx);
    secondLane.draw(ctx);
    laneSep2.draw(ctx);
    thirdLane.draw(ctx);

    playerCar.draw(ctx);

    randomLaneObstacleGenerator();

    for (let i = 0; i < lanes.length; i++) {
      let lane = lanes[i];
      lane.moveObstacles(ctx, CANVAS_HEIGHT);
    }
    
    Game.setHighscore();
    
    if (firstLane.checkCollision(playerCar) || secondLane.checkCollision(playerCar) || thirdLane.checkCollision(playerCar)) {
      cancelAnimationFrame(rafId);
      gameOver();
    } else {
      requestAnimationFrame(play);
    }
  }

  rafId = requestAnimationFrame(play);

  function gameOver() {
    localStorage.setItem('highscore', Game.highscore);
    scoreCard.style.display = 'block';
    highscore.innerHTML = `<span>${Game.score}</span>`;
    highscore.innerHTML = `<span>${Game.highscore}</span>`;
  }

  document.addEventListener('keydown', (event) => {

    let key = event.key;

    if (key === 'a') {
      if (currentLane !== 0) {
        currentLane -= 1;
        playerCar.position.start.x = initialCarX[currentLane];
        playerCar.position.end.x = playerCar.position.start.x + CAR_WIDTH;
      }
    } else if (key === 'd') {
      if (currentLane !== 2) {
        currentLane += 1;
        playerCar.position.start.x = initialCarX[currentLane];
        playerCar.position.end.x = playerCar.position.start.x + CAR_WIDTH;
      }
    }

  });
}

const canvas = document.getElementById('game');
const playButton = document.getElementById('btn-play');
const introCard = document.getElementById('intro');
const scoreCard = document.getElementById('score');
const gameScoreElement = document.getElementById('gameplay-score');
const highscoreElement = document.getElementById('highscore');

playButton.onclick = function () {
  introCard.style.display = 'none';
  canvas.style.display = 'block';
  init();
}