/*jshint esversion: 6 */
/**
 * Game class
 * @class
 * @classdesc This game class initialises and runs the game.
 */
class Game {
  /**
   * @constructor
   * @desc simple game constructor
   */
  constructor() {
    // Create an Asset manager
    this.MyAssetManager = new AssetManager("ASSETS/jsonAssets.json");

    // Initialise Box2D World
    this.b2dWorld = b2dCreateWorld();

    // Mosue Stuff
    this.mouseX = 0;
    this.mouseY = 0;
    this.clicked = false;
    document.addEventListener("mousedown", this.onClick);
    document.addEventListener("mousemove", this.printMousePos);
    document.addEventListener("mouseup", this.onRelease);

    document.body.style.userSelect = 'none';

    this.canvasHeight = document.getElementById('canvas');
    this.inSand=false;
  }

  /**
   * initialise the game world
   */
  initWorld() {
    let canvas = document.getElementById('canvas');
    document.body.style.padding = '0px, 0px, 0px, 0px';

    let div = document.createElement('div');
    div.id = 'main div';
    div.style.position = "relative";
    div.style.width = document.body.clientWidth + "px";
    div.style.height = document.body.scrollHeight + "px";
    div.appendChild(canvas);
    document.body.appendChild(div);

    gameNs.game.g = new gameScene("Game Scene", div, {'x': 0, 'y': 0, 'width': 100, 'height': 100});

    document.body.onresize = function(){
      console.log("resize");
      div.style.width = document.body.clientWidth + "px";
      div.style.height = document.body.scrollHeight + "px";
      gameNs.game.g.resizeCanvas();
    };
  }


  /**
  * updates the game
  */
  update() {
    // Sets up assets once they are loaded
    if (gameNs.game.MyAssetManager.isLoaded === true && gameNs.game.MyAssetManager.isSetUp === false) {
      gameNs.game.setUp();
    }
    // Executed once everything is loaded
    if(gameNs.game.MyAssetManager.isSetUp === true && gameNs.game.MyAssetManager.isLoaded === true)
    {
      // Terrain logic
      gameNs.game.player.body.m_linearDamping = gameNs.game.player.standardFriction;
      gameNs.game.player.emitter.color = 'rgb(0,250,0)';
      gameNs.game.inSand = false;
      for(let i = 0; i < gameNs.game.terrainList.length; i++) {
        if (gameNs.game.terrainList[i].checkCollision(
          gameNs.game.player.body.GetCenterPosition().x,
          gameNs.game.player.body.GetCenterPosition().y,
          20,
        )) {
          if (gameNs.game.terrainList[i].type === "Water") {
            gameNs.game.player.body.SetCenterPosition(
              { x: gameNs.game.player.startPos.x,
                y: gameNs.game.player.startPos.y,},
              0,
            );
            gameNs.game.player.getBody().SetLinearVelocity(new b2Vec2(0,0));
            gameNs.game.player.shotNumber +=1;
            console.log("WATER!");
          } else {
            gameNs.game.player.body.m_linearDamping = gameNs.game.player.sandFriction;
            gameNs.game.player.emitter.color = 'rgb(255,0,0)';
            gameNs.game.inSand = true;
          }
        }
      }
      gameNs.game.b2dWorld.Step(1.0 / 60.0, 1);
      gameNs.game.MyAssetManager.update();
      gameNs.game.levelHandler.update();
      //gameNs.game.obRo.updateSprite();
      gameNs.game.player.update(window.innerWidth, window.innerHeight);
      gameNs.game.goal.update(window.innerWidth, window.innerHeight);

      if (gameNs.game.goal.collision(gameNs.game.player.getBody().GetCenterPosition().x, gameNs.game.player.getBody().GetCenterPosition().y, 20)) {
        //console.log("PUT");
        gameNs.game.goal.emit = true;

        gameNs.game.player.score += gameNs.game.player.shotNumber - 4;
        gameNs.game.player.shotNumber = 0;
        console.log("Score: ",gameNs.game.player.score);

        gameNs.game.player.getBody().SetCenterPosition(new b2Vec2(600, 200), gameNs.game.player.getBody().GetRotation());
        gameNs.game.player.getBody().SetLinearVelocity(new b2Vec2(0, 0));
      }
      if (gameNs.game.goal.emit === true) {
        gameNs.game.goal.particleTimer += 1;
        if (gameNs.game.goal.particleTimer >= 180) {
          gameNs.game.goal.emit = false;
          gameNs.game.goal.particleTimer = 0;
        }
      }
      gameNs.game.draw();
    }

    window.requestAnimationFrame(gameNs.game.update);
  }

  /**
   * draws the game
   */
  draw() {
    var canv = document.getElementById("canvas");
    var ctx = canv.getContext("2d");
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);


    if(this.inSand === false)
    {
      this.player.draw(ctx);
    }

    // Executed once everything is loaded
    if (this.MyAssetManager.isSetUp === true && this.MyAssetManager.isLoaded === true) {
      this.MyAssetManager.draw();
    }

    if(this.inSand === true)
    {
      this.player.draw(ctx);
    }


    if (this.clicked) {
      ctx.beginPath();
      ctx.moveTo(this.player.getBody().GetCenterPosition().x, this.player.getBody().GetCenterPosition().y);
      ctx.lineTo(this.mouseX, this.mouseY);
      ctx.stroke();
    }

    this.goal.draw(ctx);

    //drawWorld(this.b2dWorld, ctx);

  }

  /**
   * Game setUp function for when files are finished loading
   * @function setUp
   */
  setUp() {
    // Create Player
    this.player = new PlayerBall(this.b2dWorld, 216, 433, 20, this.MyAssetManager);
    this.goal = new Goal(1496,864,20);

    this.terrainList = [
      new Terrain(800,400,100,100,"Sandtrap", this.MyAssetManager),
      new Terrain(400,400,200,100,"Water", this.MyAssetManager),
      ];
    // this.boundLeft = new BoundaryRect(0, 450, true, this.b2dWorld, this.MyAssetManager, "boundary_vertical_left");
    // this.boundRight = new BoundaryRect(1595, 450, true, this.b2dWorld, this.MyAssetManager, "boundary_vertical_right");
    // this.boundTop = new BoundaryRect(800, 5, false, this.b2dWorld, this.MyAssetManager, "boundary_horizontal_top");
    // this.boundBottom = new BoundaryRect(800, 895, false, this.b2dWorld, this.MyAssetManager, "boundary_horizontal_bottom");

    // Demo obstacles
    // this.obs2 = new ObstacleSquare(233, 649, 0, this.b2dWorld, this.MyAssetManager, "wall_square");
    // this.obs3 = new ObstacleCircle(533, 33, this.b2dWorld, this.MyAssetManager, "wall_circle");
    // this.obs4 = new ObstacleCircle(766, 233, this.b2dWorld, this.MyAssetManager, "wall_circle");
    // this.obs5 = new ObstacleCircle(964, 83, this.b2dWorld, this.MyAssetManager, "wall_circle");
    // this.obs6 = new ObstacleSquare(1396, 216, 0, this.b2dWorld, this.MyAssetManager, "wall_square");
    // this.obs7 = new ObstacleSquare(615, 515, 55, this.b2dWorld, this.MyAssetManager, "wall_square");
    // this.obs8 = new ObstacleRect(581, 900, 20, this.b2dWorld, this.MyAssetManager, "wall_rect_vertical");
    // this.obs9 = new ObstacleRect(831, 831, 40, this.b2dWorld, this.MyAssetManager, "wall_rect_vertical");
    // this.obs10 = new ObstacleCircle(1197, 831, this.b2dWorld, this.MyAssetManager, "wall_circle");
    // Declare sprites images && sounds here using... 

    // overall asset setup, can do this in each class for other object images
     this.coin = this.MyAssetManager.find(this.MyAssetManager.ImageAssets, "coin");
     this.coin.setSpriteSheet(true, 5, 5);
     //this.coin.setActive(true);
     this.music = this.MyAssetManager.find(this.MyAssetManager.SoundAssets, "music");
     this.music.loop = true;
    // confirm assets are setup
    this.levelHandler = new LevelHandler();
    this.levelHandler.addLevel(new Level("assets/level.json"));
    this.levelHandler.levels.forEach((level) => {
      level.loadLevel();
    });
    gameNs.game.MyAssetManager.isSetUp = true;
  }

  onClick() {
    //var v = new b2Vec2(circleBody.GetCenterPosition().x - mouseX, circleBody.GetCenterPosition().y - mouseY);
    //v.Normalize();
    //circleBody.ApplyImpulse(new b2Vec2(v.x*300,v.y*300), circleBody.GetCenterPosition());
    if ((gameNs.game.player.getBody().GetLinearVelocity().x >= -3 && gameNs.game.player.getBody().GetLinearVelocity().x <= 3) &&
      (gameNs.game.player.getBody().GetLinearVelocity().y >= -3 && gameNs.game.player.getBody().GetLinearVelocity().y <= 3)) {
      gameNs.game.clicked = true;
      console.log("clicked");
    }
  }

  onRelease() {
    if (gameNs.game.clicked) {
      console.log("release");
      gameNs.game.player.shotNumber += 1;
      console.log("Shot number: ",gameNs.game.player.shotNumber);
      var v = new b2Vec2(gameNs.game.player.getBody().GetCenterPosition().x - gameNs.game.mouseX, gameNs.game.player.getBody().GetCenterPosition().y - gameNs.game.mouseY);
      //console.log("v: ",v)

      gameNs.game.player.startPos.x = gameNs.game.player.getBody().GetCenterPosition().x;
      gameNs.game.player.startPos.y = gameNs.game.player.getBody().GetCenterPosition().y;
      //console.log(v);
      if(v.x > 500)
      {
        v.x = 500;
      }
      if(v.x < -500)
      {
        v.x = -500;
      }
      if(v.y > 500)
      {
        v.y = 500;
      }
      if(v.y < -500)
      {
        v.y = -500;
      }
      gameNs.game.player.getBody().ApplyImpulse(new b2Vec2(v.x * 500, v.y * 500), gameNs.game.player.getBody().GetCenterPosition());
      gameNs.game.clicked = false;
    }
  }

  printMousePos(event) {
    var canvas = document.getElementById('canvas');
    var rect = canvas.getBoundingClientRect();
    gameNs.game.mouseX = (event.clientX - rect.left)/ (rect.right - rect.left) * canvas.width;
    gameNs.game.mouseY = (event.clientY - rect.top)/ (rect.bottom - rect.top) * canvas.height;
  }

}
