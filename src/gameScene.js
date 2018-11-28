
class gameScene extends Scene{

    constructor(title, div, bounds, _colour) {
        super(title, div, bounds, _colour);

        this.statusBar = document.createElement('div');
        this.statusBar.id = 'status bar';
        this.statusBar.style.position = 'absolute';
        this.statusBar.style.width = '100%';
        this.statusBar.style.height = '10%';
        this.statusBar.style.background = "rgba(155,155,255,155)"


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
        new Button("Pause Button", stat, function(){
            pause.style.display = 'block';
        }, {'x': 2, 'y': 40, 'width': 10, 'height': 10}, "%");
        new Button("Unpause Button", pause, function(){
            pause.style.display = 'none';
        }, {'x': 50, 'y': 50, 'width': 10, 'height': 10}, "%");

        this.init();

        this._containerDiv.appendChild(document.getElementById("canvas"));
    }

    init()
    {
        let canv =  document.getElementById("canvas");
        let ctx = canv.getContext("2d");
        canv.style.position = 'absolute';
        canv.style.height = "90%";
        canv.style.width = '100%';
        canv.style.top = "10%";
    }

    resizeCanvas(){
        let canv =  document.getElementById("canvas");
        let screenX = document.body.clientWidth;
        let screenY = document.body.scrollHeight*0.9;
        let ratio = 19/9;
        let newRatio = screenX/screenY;

        if (newRatio > ratio) {
            screenX = screenY * widthToHeight;
            canv.style.height = screenY + 'px';
            canv.style.width = screenX + 'px';
        } else {
            newHeight = screenX / widthToHeight;
            canv.style.width = screenX + 'px';
            canv.style.height = screenY + 'px';
        }


    }


}