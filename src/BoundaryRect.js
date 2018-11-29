/**
 * @class BoundaryRect
 * @classdesc Simple rectangle obstacle for the player to collide with
 */
class BoundaryRect{
  
    /**
    * @constructor
    * @desc Simple constructor
    */
    constructor(x, y, vertical, world, assetManager, sprite)
    {
        vertical = vertical === true;
        this.image = assetManager.find(assetManager.ImageAssets, sprite);
        if(vertical)
        {
            this.body = b2dCreateBox(x, y, 5, 450, world, true);  
            this.image.setPos(x - 5, y - 450);
        } 
        else
        {
            this.body = b2dCreateBox(x, y, 800, 5, world, true);  
            this.image.setPos(x - 800, y - 5);
        }
        this.image.setActive(true);
    }

    getBody()
    {
        return this.body;
    }
}
  