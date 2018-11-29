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
    this.body1 = b2dCreateBox(200, 200, 40, 40, this.b2dWorld, true);
    //this.body2 = b2dCreateCircle(600, 200, 40, this.b2dWorld, false);
    this.player = new PlayerBall(this.b2dWorld, 600,200,20);
    this.body3 = b2dCreateBox(400, 400, 40, 40, this.b2dWorld, false);


    // Mosue Stuff
    this.mouseX;
    this.mouseY;
    this.clicked = false;
    document.addEventListener("mousedown", this.onClick);
    document.addEventListener("mousemove", this.printMousePos);
    document.addEventListener("mouseup", this.onRelease);



    this.canvasHeight = document.getElementById('canvas')
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
    this.menuHandler = new MenuHandler();
    let g = new gameScene("Game Scene", div, {'x': 0, 'y': 0, 'width': 100, 'height': 100});
    this.menuHandler.addScene("Game Scene", g);
    this.initMenus();
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
    if (gameNs.game.MyAssetManager.isSetUp === true && gameNs.game.MyAssetManager.isLoaded === true) {
      gameNs.game.b2dWorld.Step(1.0 / 60.0, 1);
      gameNs.game.MyAssetManager.update();
      gameNs.game.obRo.updateSprite();
      gameNs.game.player.update(window.innerWidth, window.innerHeight);
      gameNs.game.goal.update(window.innerWidth, window.innerHeight);

      if (gameNs.game.goal.collision(gameNs.game.player.getBody().GetCenterPosition().x, gameNs.game.player.getBody().GetCenterPosition().y, 20)) {
        //console.log("PUT");
        gameNs.game.goal.emit = true;
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
    this.player.draw(ctx);
    // Executed once everything is loaded
    if (this.MyAssetManager.isSetUp === true && this.MyAssetManager.isLoaded === true) {
      this.MyAssetManager.draw();
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
    this.player = new PlayerBall(this.b2dWorld, 600, 200, 20, this.MyAssetManager);
    this.goal = new Goal(800, 200, 20);


    // Demo obstacles
    this.obSq = new ObstacleSquare(100, 100, 45, this.b2dWorld, this.MyAssetManager);
    this.obRe = new ObstacleRect(700, 400, 45, this.b2dWorld, this.MyAssetManager);
    this.obCi = new ObstacleCircle(500, 100, this.b2dWorld, this.MyAssetManager);
    this.obRo = new ObstacleRotor(100, 400, this.b2dWorld, this.MyAssetManager);
    this.boReV = new BoundaryRect(0, 450, true, this.b2dWorld, this.MyAssetManager);
    this.boReV = new BoundaryRect(800, 0, false, this.b2dWorld, this.MyAssetManager);
    // Declare sprites images && sounds here using...
    //overall asset setup, can do this in each class for other object images
     this.coin = this.MyAssetManager.find(this.MyAssetManager.ImageAssets, "coin");
     this.coin.setSpriteSheet(true, 5, 5);
     //this.coin.setActive(true);
     this.music = this.MyAssetManager.find(this.MyAssetManager.SoundAssets, "music");
     this.music.loop = true;
    // confirm assets are setup
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
      var v = new b2Vec2(gameNs.game.player.getBody().GetCenterPosition().x - gameNs.game.mouseX, gameNs.game.player.getBody().GetCenterPosition().y - gameNs.game.mouseY);
      //console.log("v: ",v)
      gameNs.game.player.getBody().ApplyImpulse(new b2Vec2(v.x * 500, v.y * 500), gameNs.game.player.getBody().GetCenterPosition());
      gameNs.game.clicked = false;
    }
  }

  printMousePos(event) {
    gameNs.game.mouseX = event.clientX;
    gameNs.game.mouseY = event.clientY;
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

    let leaderboardMenuScene = new Scene("Leaderboard",
        document.getElementById("main div"),
        {'x': 0, 'y': 0, 'width': 100, 'height': 100},
        "#77e7ff",
        "%");
    let leaderboardMenu = new Menu("Leaderboard Menu",
        {'x': 0, 'y': 0, 'width': 100, 'height': 100},
        "%");
    leaderboardMenuScene.addMenu(leaderboardMenu);
    let backBtn = new Button("Back", leaderboardMenu.containerDiv,
        this.menuHandler.goToScene.bind(this.menuHandler, "Main Menu"),
        {'x': 40, 'y': 60, 'width': 20, 'height': 10},
        "%");
    this.menuHandler.addScene("Leaderboard", leaderboardMenuScene);

    this.menuHandler.currentScene = "Main Menu";
    this.menuHandler.showOnlyCurrentScene();
  }

}
