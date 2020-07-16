class Scoreboard {
  constructor(position, firstServer) {
    this.position = position;
    this.state = {
      'serveChange': 2,
      'server': firstServer,
      'driver': firstServer
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
    this.totalGames = 1;
  }

  draw = () => {
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, 300, 100);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.closePath();
  }

  updateScore = () => {
    const bounce = `${player.bounce}${opponent.bounce}`;

    console.log(bounce);

    if (this.state.serveSuccess) {
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

      if (this.scores.current.player === 11) gameOver(player);
      if (this.scores.current.opponent === 11) gameOver(opponent);

    } else {

      const dPoints = this.scores.current.player - this.scores.current.opponent;
      if (Math.abs(dPoints) === 2) {
        const winner = dPoints > 0 ? player : opponent;
        gameOver(winner);
      }
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

}