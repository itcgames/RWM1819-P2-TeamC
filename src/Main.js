/*jshint esversion: 6 */
/**
* @author Eric O' Toole && Dylan Murphy
* Code has been reviewed
* entry point for js
* Total time 2 hours
*/

var gameNs = {};

function main()
{
  init();
  const game = new Game ();
  gameNs.game = game;
  game.initWorld();
  game.update();
}

/**
* Initialise the canvas
*/
function init()
{
    console.log('initialising Game');

    var canv = document.createElement('canvas');
    canv.id = "canvas";
    var ctx = canv.getContext("2d");

    canv.width = window.innerWidth;
    canv.height = window.innerHeight;

    document.body.appendChild(canv);
}
