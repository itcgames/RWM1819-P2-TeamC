class leaderboardScene extends Scene{

  constructor(title, div, bounds, _colour) {
    super(title, div, bounds, _colour);
    let menu = new Menu("Leaderboard",
        {'x': 20, 'y': 20, 'width': 60, 'height': 60},
        "%");
    new Button("Back", menu.containerDiv,
        gameNs.game.menuHandler.goToScene.bind(gameNs.game.menuHandler,
            "Main Menu"),
        {'x': 40, 'y': 80, 'width': 20, 'height': 10},
        "%");
    this.addMenu(menu);
  }

  render(ctx) {
    let canv =  document.getElementById("canvas");
    let screenX = document.body.clientWidth;
    let screenY = document.body.scrollHeight*0.9;
    let ratio = 16/9;
    let newRatio = screenX/screenY;

    if (newRatio > ratio) {
      screenX = screenY * ratio;
      canv.style.height = screenY + 'px';
      canv.style.width = screenX + 'px';
    } else {
      screenY = screenX / ratio;
      canv.style.width = screenX + 'px';
      canv.style.height = screenY + 'px';
    }
  }
}