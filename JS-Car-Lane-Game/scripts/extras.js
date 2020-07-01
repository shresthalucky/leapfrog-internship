const Position = function (x, y) {
  this.x = x;
  this.y = y;
}

const images = new function () {
  this.road = new Image();
  this.road.src = './assets/road.jpg';

  this.player = new Image();
  this.player.src = './assets/player.png';

  this.opponent1 = new Image();
  this.opponent1.src = './assets/opponent1.png';

  this.opponent2 = new Image();
  this.opponent2.src = './assets/opponent2.png';

  this.opponent3 = new Image();
  this.opponent3.src = './assets/opponent3.png';
}

const opponentImages = [images.opponent1, images.opponent2, images.opponent3];

let Game = new function () {
  this.speed = 14;
  this.score = 0;
  this.highscore = localStorage.getItem('highscore') | 0;
  this.bulletSpeed = 16;

  this.increaseScore = () => {
    this.score += 10;
    if (this.score % 50 === 0) {
      this.speed += 2;
      console.log(this.speed);
    }
  }

  this.setHighscore = () => {
    if (this.score > this.highscore) {
      this.highscore = this.score;
    }
  }

  this.reset = () => {
    this.speed = 14;
    this.score = 0;
    this.highscore = localStorage.getItem('highscore') | 0;
  }

}