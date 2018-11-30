
class gameScene extends Scene{

    constructor(title, div, bounds, _colour) {
        super(title, div, bounds, _colour);

        this.statusBar = document.createElement('div');
        this.statusBar.id = 'status bar';
        this.statusBar.style.position = 'absolute';
        this.statusBar.style.width = '100%';
        this.statusBar.style.height = '10%';
        this.statusBar.style.background = "url('assets/paper.jpg')";
        this.statusBar.style.backgroundSize = "cover";
        let shotText = document.createElement("h1");
        shotText.style.position = "absolute";
        shotText.style.fontFamily = "Arial";
        shotText.style.left = "70%";
        shotText.style.top = "2%";
        shotText.style.width = "25%";
        shotText.style.height = "10%";
        shotText.innerText = "Shot No.: 0";
        shotText.style.fontSize = "40px";
        this.shotText = shotText;
        this.statusBar.appendChild(this.shotText);

      let scoreText = document.createElement("h1");
      scoreText.style.position = "absolute";
      scoreText.style.fontFamily = "Arial";
      scoreText.style.left = "40%";
      scoreText.style.top = "2%";
      scoreText.style.width = "25%";
      scoreText.style.height = "10%";
      scoreText.innerText = "Score: 0";
      scoreText.style.fontSize = "40px";
      this.scoreText = scoreText;
      this.statusBar.appendChild(this.scoreText);


        this.pauseDiv =  document.createElement('div');
        this.pauseDiv.id = "pause screen";
        this.pauseDiv.style.position = "absolute";
    
        this.pauseDiv.style.width = '100%';
        this.pauseDiv.style.height = '100%';
        this.pauseDiv.style.zIndex = '2';
        this.pauseDiv.style.backgroundColor = "rgba(155, 155, 155, 0.5)";
        this.pauseDiv.style.display = 'none';
        this._containerDiv.appendChild(this.pauseDiv);
        this._containerDiv.appendChild(this.statusBar);

        let stat = this.statusBar;
        let pause = this.pauseDiv;
        let pauseBtn = new Button("Pause", stat, function(){
            pause.style.display = 'block';
            gameNs.game.menuHandler.currentScene = "Pause";
        }, {'x': 2, 'y': 25, 'width': 15, 'height': 50}, "%");
        pauseBtn._element.style.borderRadius = "10px";
        let resumeBtn = new Button("Resume", pause, function(){
            pause.style.display = 'none';
            gameNs.game.menuHandler.currentScene = "Game Scene";
        }, {'x': 40, 'y': 45, 'width': 20, 'height': 10}, "%");
        resumeBtn._element.style.borderRadius = "10px";

        this.init();

        this._containerDiv.appendChild(document.getElementById("canvas"));
    }

    init() {
        let canv =  document.getElementById("canvas");
        canv.style.position = 'absolute';
        canv.width = 1600;
        canv.height = 900;
        this.resizeCanvas();
        canv.style.top = "10%";
    }

    resizeCanvas() {

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

    updateShotText(shot) {
      this.shotText.innerText = `Shot No.: ${shot}`;
    }

    updateScoreText(score) {
        this.scoreText.innerText = `Score: ${score}`;
    }
}