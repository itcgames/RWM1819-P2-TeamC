class Game
{
  /**
  * @constructor
  * @desc simple game constructor
  */
  constructor()
  {

  }

  /**
  * initialise the game world
  */
  initWorld()
  {
  }

  /**
  * updates the game
  */
  update()
  {
    gameNs.game.draw();
    console.log("test");
    window.requestAnimationFrame(gameNs.game.update);
  }

  /**
  * draws the game
  */
  draw()
  {
    var canv = document.getElementById("mycanvas");
    var ctx = canv.getContext("2d");
    ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
  }
}
