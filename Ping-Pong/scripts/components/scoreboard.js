class Scoreboard {
  constructor(position, firstServer, bestOfGames = 1) {
    this.position = position;
    this.firstServer = firstServer;
    this.state = {
      'serveChange': 2,
      'server': this.firstServer,
      'driver': this.firstServer
    }
    this.scores = {
      'current': {
        'player': 0,
        'opponent': 0
      },
      'games': {
        'player': 0,
        'opponent': 0
      }
    }
    this.bestOfGames = bestOfGames;
  }

  drawCard = () => {

    if (this.state.server === player) {
      ctx.drawImage(sprite,
        Scoreboard.sprite.player.sx,
        Scoreboard.sprite.player.sy,
        Scoreboard.sprite.player.sw,
        Scoreboard.sprite.player.sh,
        this.position.x,
        this.position.y,
        Scoreboard.sprite.player.sw,
        Scoreboard.sprite.player.sh
      );
    } else if (this.state.server === opponent) {
      ctx.drawImage(sprite,
        Scoreboard.sprite.opponent.sx,
        Scoreboard.sprite.opponent.sy,
        Scoreboard.sprite.opponent.sw,
        Scoreboard.sprite.opponent.sh,
        this.position.x,
        this.position.y,
        Scoreboard.sprite.opponent.sw,
        Scoreboard.sprite.opponent.sh
      );
    }
  }

  drawScore = () => {
    ctx.beginPath();
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = WHITE;
    ctx.fillText('YOU', 70, 52);
    ctx.fillText('COMPUTER', 54, 52 * 2);
    ctx.fillText('COMPUTER', 54, 52 * 2);
    ctx.fillText(this.scores.games.player, 304, 52);
    ctx.fillText(this.scores.games.opponent, 288, 52 * 2);
    ctx.fillStyle = BLACK_A;
    ctx.fillText(this.scores.current.player, 364, 52);
    ctx.fillText(this.scores.current.opponent, 348, 52 * 2);
    ctx.closePath();
  }

  draw = () => {
    this.drawCard();
    this.drawScore();
  }

  updateScore = () => {
    const bounce = `${player.bounce}${opponent.bounce}`;

    // console.log(Game.state.serveSuccess, this.state.driver, bounce);

    if (Game.state.serveSuccess) {
      if (this.state.driver === player) {
        if (bounce === '01') {
          this.scores.current.player++;
        } else {
          this.scores.current.opponent++;
        }
      } else if (this.state.driver === opponent) {
        if (bounce === '10') {
          this.scores.current.opponent++;
        } else {
          this.scores.current.player++;
        }
      }
    } else {
      if (this.state.server === player) {
        if (bounce === '11') {
          this.scores.current.player++;
        } else {
          this.scores.current.opponent++;
        }
      } else if (this.state.server === opponent) {
        if (bounce === '11') {
          this.scores.current.opponent++;
        } else {
          this.scores.current.player++;
        }
      }
    }

    if (this.scores.current.player === 10 && this.scores.current.opponent === 10) {
      this.state.serveChange = 1;
    }

    console.log(this.scores.current);

  }


  checkWin = (gameOver) => {

    if (!this.state.deuce) {

      if (this.scores.current.player === 11) {
        this.scores.games.player++;
        gameOver();
        return;
      }

      if (this.scores.current.opponent === 11) {
        this.scores.games.opponent++;
        gameOver();
        return;
      }

    } else {

      const dPoints = this.scores.current.player - this.scores.current.opponent;
      
      if (Math.abs(dPoints) === 2) {
        const winner = dPoints > 0 ? 'player' : 'opponent';
        this.scores.games[winner]++;
        gameOver();
      }
    }
  }

  allOver = (endGame) => {
    const playerWins = this.scores.games.player;
    const opponentWins = this.scores.games.opponent;
    const requiredWins = Math.ceil(this.bestOfGames / 2);

    if (playerWins === requiredWins) {
      console.log('player wins');
      endGame();
      return;
    }

    if (opponentWins === requiredWins) {
      console.log('computer wins');
      endGame();
      return;
    }
  }

  server = () => {
    const points = this.scores.current.player + this.scores.current.opponent;

    if (points % this.state.serveChange === 0) {
      const side = this.state.server === player ? opponent : player;
      this.state.server = side;
      this.state.driver = side;
    }
  }

  resetState = () => {
    this.state = {
      'serveChange': 2,
      'server': this.firstServer,
      'driver': this.firstServer
    }
    this.scores.current.player = 0;
    this.scores.current.opponent = 0;
  }

}

Scoreboard.sprite = {
  'player': {
    'sx': 0,
    'sy': 316,
    'sw': 390,
    'sh': 100
  },
  'opponent': {
    'sx': 0,
    'sy': 417,
    'sw': 390,
    'sh': 100
  }
}