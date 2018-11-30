class leaderboardScene extends Scene{

  constructor(title, div, bounds, _colour) {
    super(title, div, bounds, _colour);
    let menu = new Menu("Leaderboard",
        {'x': 20, 'y': 20, 'width': 60, 'height': 60},
        "%");

  
    menu._containerDiv.style.backgroundColor = "rgb(0,255,0,0)";
   
    //menu._containerDiv.style.opacity = 0;
    new Button("Back", menu.containerDiv, () => {

      gameNs.game.menuHandler.goToScene("Main Menu");
      canv2.style.visibility = "hidden";
    },
        {'x': 40, 'y': 90, 'width': 20, 'height': 10},
        "%");


        var canv2 = document.createElement('canvas');
        canv2.style.position = "absolute";
        canv2.id = "boardcanvas";
        canv2.width = 1100;
        canv2.height = 500;
        //canv2.style.width = "100%";
        //canv2.style.height = "100%";
        canv2.style.visibility = "hidden";

        menu._containerDiv.appendChild(canv2);
    this.addMenu(menu);
    this.count = 0;
    this.x = 10;
    this.y = 30;
  }

    drawLeaderboard(ctx) {
      var canv2 =  document.getElementById("boardcanvas");
      var ctx2 = canv2.getContext("2d");
      canv2.style.visibility = "visible";

      gameNs.game.ScoreBoardTop.filterTime(1);

      ctx2.fillStyle = "black";
      ctx2.fillRect(0,0, canv2.width, canv2.height);

      debugger
      for (var i = 0; i < gameNs.game.ScoreBoardTop.scoreboard.length; i++) {
        var place = i + 1;
        var player = gameNs.game.ScoreBoardTop.scoreboard[i];
        var name = player.name;
        var time = player.time;
        var seconds = player.seconds;
        var id = player.playerID;

        ctx2.fillStyle = "white";
        ctx2.font="20px Verdana";
        ctx2.fillText(place +") " +  name + ": " + time + " : " + seconds, this.x, this.y);
        console.log(place +") " +  name + ": " + time + " : " + seconds + " : " + this.x + this.y);

        this.y += 50;
        this.count += 1;
        if(this.count === 10){
          break;
        }
    }

    this.count = 0;
    this.y = 30;
  }
}