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
    let canvas = document.getElementById('mycanvas');
    document.body.style.padding = '0px, 0px, 0px, 0px';

    let div =  document.createElement('div');
    div.style.position = "relative";
    div.style.width = document.body.clientWidth + "px";
    div.style.height = document.body.scrollHeight + "px";
    div.appendChild(canvas);
    document.body.appendChild(div);

    let g = new gameScene("Game Scene", div, {'x': 0, 'y': 0, 'width': 100, 'height': 100});
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
