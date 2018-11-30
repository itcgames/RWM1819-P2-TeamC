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
    this.menuHandler = new MenuHandler();

    var ws = new WebSocket("ws://149.153.106.151:8080/wstest");

    //called when the websocket is opened
    ws.onopen = function() {
      var message = {};
      message.type = "connect";
      message.data = "game";
      var mString = JSON.stringify(message);
      ws.send(mString);
    };

    //called when the client receives a message
    ws.onmessage = function (evt) {

      let obj = JSON.parse(evt.data);
      let bod = gameNs.game.player.getBody();
      if((bod.GetLinearVelocity().x >= -3 && bod.GetLinearVelocity().x <= 3) &&
          (bod.GetLinearVelocity().y >= -3 && bod.GetLinearVelocity().y <= 3)) {

          gameNs.game.playerShot(new b2Vec2(obj.x, obj.y));

      }
    };
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

    gameNs.game.g = new gameScene("Game Scene", div, 
      {'x': 0, 'y': 0, 'width': 100, 'height': 100});

    this.menuHandler.addScene("Game Scene", gameNs.game.g);
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
    if (gameNs.game.MyAssetManager.isLoaded === true && 
        gameNs.game.MyAssetManager.isSetUp === false) {
      gameNs.game.setUp();
    }
    // Executed once everything is loaded
    if(gameNs.game.MyAssetManager.isSetUp === true && 
        gameNs.game.MyAssetManager.isLoaded === true) {
      
      let plyr = gameNs.game.player;

      // Terrain logic
      plyr.body.m_linearDamping = plyr.standardFriction;
      plyr.emitter.color = 'rgb(0,250,0)';
      gameNs.game.inSand = false;
      for (let i = 0; i < gameNs.game.terrainList.length; i++) {
        if (gameNs.game.terrainList[i].checkCollision(
            plyr.body.GetCenterPosition().x,
            plyr.body.GetCenterPosition().y,
            20
        )) {
          if (gameNs.game.terrainList[i].type === "Water") {
            plyr.body.SetCenterPosition(
                {
                  x: plyr.startPos.x,
                  y: plyr.startPos.y,
                },
                0
            );
            plyr.getBody().SetLinearVelocity(new b2Vec2(0, 0));
            plyr.shotNumber += 1;
            console.log("WATER!");
          } else {
            plyr.body.m_linearDamping = plyr.sandFriction;
            plyr.emitter.color = 'rgb(255,0,0)';
            gameNs.game.inSand = true;
          }
        }
      }

      if(gameNs.game.menuHandler.currentScene === "Game Scene") {
        gameNs.game.b2dWorld.Step(1.0 / 60.0, 1);
        gameNs.game.MyAssetManager.update();
        gameNs.game.levelHandler.update();

        plyr.update(window.innerWidth, window.innerHeight);
        gameNs.game.goal.update(window.innerWidth, window.innerHeight);

        if (gameNs.game.goal.collision(plyr.getBody().GetCenterPosition().x, 
            plyr.getBody().GetCenterPosition().y, 20)) {

          gameNs.game.goal.emit = true;

          plyr.score += plyr.shotNumber - 4;
          plyr.shotNumber = 0;
          console.log("Score: ", plyr.score);

          plyr.getBody().SetCenterPosition(new b2Vec2(600, 200), 
              plyr.getBody().GetRotation());
          plyr.getBody().SetLinearVelocity(new b2Vec2(0, 0));
          gameNs.game.levelHandler.currentLevel.hideLevel();
          gameNs.game.levelHandler.goToLevel(gameNs.game.levelHandler._currentLevelIndex+1);
          gameNs.game.levelHandler.currentLevel.loadLevel();
        }
        if (gameNs.game.goal.emit === true) {
          gameNs.game.goal.particleTimer += 1;
          if (gameNs.game.goal.particleTimer >= 180) {
            gameNs.game.goal.emit = false;
            gameNs.game.goal.particleTimer = 0;
          }
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
    ctx.clearRect(0, 0, canv.width, canv.height);


    if(this.inSand === false){
      this.player.draw(ctx);
    }

    // Executed once everything is loaded
    if (this.MyAssetManager.isSetUp === true && 
          this.MyAssetManager.isLoaded === true) {
      this.MyAssetManager.draw();
    }

    if(this.inSand === true){
      this.player.draw(ctx);
    }


    if (this.clicked) {
      ctx.beginPath();
      ctx.moveTo(this.player.getBody().GetCenterPosition().x, 
          this.player.getBody().GetCenterPosition().y);
      ctx.lineTo(this.mouseX, this.mouseY);
      ctx.stroke();
    }

    this.goal.draw(ctx);
    drawWorld(this.b2dWorld, ctx);

  }

  /**
   * Game setUp function for when files are finished loading
   * @function setUp
   */
  setUp() {
    // Create Player
    this.player = 
      new PlayerBall(this.b2dWorld, 216, 433, 20, this.MyAssetManager);
    this.goal = new Goal(1496,864,20);

    // overall asset setup, can do this in each class for other object images

     this.music = 
      this.MyAssetManager.find(this.MyAssetManager.SoundAssets, "music");
     this.music.loop = true;
     this.music.play();
    // confirm assets are setup
    this.levelHandler = new LevelHandler();
    this.levelHandler.addLevel(new Level("assets/level1.json"));
    this.levelHandler.addLevel(new Level("assets/level2.json"));
    this.levelHandler.addLevel(new Level("assets/level3.json"));
    this.levelHandler.currentLevel.loadLevel(); 
    this.initMenus();
    gameNs.game.MyAssetManager.isSetUp = true;
  }

  onClick() {
    if ((gameNs.game.player.getBody().GetLinearVelocity().x >= -3 && 
        gameNs.game.player.getBody().GetLinearVelocity().x <= 3) &&
        (gameNs.game.player.getBody().GetLinearVelocity().y >= -3 && 
        gameNs.game.player.getBody().GetLinearVelocity().y <= 3) && 
        gameNs.game.menuHandler.currentScene === "Game Scene") {

      gameNs.game.clicked = true;
      console.log("clicked");
    }
  }

  onRelease() {
    if (gameNs.game.clicked && 
        gameNs.game.menuHandler.currentScene === "Game Scene") {
      console.log("release");
      gameNs.game.player.shotNumber += 1;
      console.log("Shot number: ",gameNs.game.player.shotNumber);
      var v = 
        new b2Vec2(gameNs.game.player.getBody().GetCenterPosition().x - 
        gameNs.game.mouseX, gameNs.game.player.getBody().GetCenterPosition().y - 
        gameNs.game.mouseY);

      gameNs.game.player.startPos.x = 
        gameNs.game.player.getBody().GetCenterPosition().x;
      gameNs.game.player.startPos.y = 
        gameNs.game.player.getBody().GetCenterPosition().y;

      gameNs.game.playerShot(v);
      gameNs.game.clicked = false;
    }
  }

  playerShot(v) {
      if(v.x > 500){
        v.x = 500;
      }
      else if(v.x < -500){
        v.x = -500;
      }
      if(v.y > 500){
        v.y = 500;
      }
      else if(v.y < -500){
        v.y = -500;
      }
      gameNs.game.player.getBody().ApplyImpulse(new b2Vec2(v.x * 500, v.y * 500), 
        gameNs.game.player.getBody().GetCenterPosition());
  }

  printMousePos(event) {
    var canvas = document.getElementById('canvas');
    var rect = canvas.getBoundingClientRect();
    gameNs.game.mouseX = 
      (event.clientX - rect.left)/ (rect.right - rect.left) * canvas.width;
    gameNs.game.mouseY = 
      (event.clientY - rect.top)/ (rect.bottom - rect.top) * canvas.height;
  }


  initMenus() {
    let mainMenuScene = new Scene("Main Menu",
        document.getElementById("main div"),
        {'x': 0, 'y': 0, 'width': 100, 'height': 100},
        "#FF0026",
        "%");
    let mainMenu = new Menu("Main Menu",
        {'x': 0, 'y': 0, 'width': 100, 'height': 100},
        "%");
    mainMenuScene.alpha = "22";
    mainMenuScene.addMenu(mainMenu);
    let playBtn = new Button("Play", mainMenu.containerDiv,
        this.menuHandler.goToScene.bind(this.menuHandler, "Game Scene"),
        {'x': 40, 'y': 60, 'width': 20, 'height': 10},
        "%");

    let leaderboardBtn = new Button("Leaderboard", mainMenu.containerDiv,
        this.menuHandler.goToScene.bind(this.menuHandler, "Leaderboard"),
        {'x': 40, 'y': 75, 'width': 20, 'height': 10},
        "%");

    this.menuHandler.addScene("Main Menu", mainMenuScene);

    let leaderboard = new leaderboardScene("Leaderboard",
        document.getElementById("main div"),
        {'x': 0, 'y': 0, 'width': 100, 'height': 100},
        "#7aacff");
    this.menuHandler.addScene("Leaderboard", leaderboard);

    this.menuHandler.currentScene = "Main Menu";
    this.menuHandler.showOnlyCurrentScene();
  }

}
