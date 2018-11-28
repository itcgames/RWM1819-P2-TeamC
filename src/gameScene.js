
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
        this.pauseDiv.position = "relative";
    
        this.pauseDiv.style.width = '100%';
        this.pauseDiv.style.height = '100%';
        this.pauseDiv.style.background = "rgba(155,155,155,155)"
        this.pauseDiv.style.display = 'none';
        this._containerDiv.appendChild(this.pauseDiv);
        this._containerDiv.appendChild(this.statusBar);

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


}