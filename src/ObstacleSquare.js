/**
 * @class ObstacleSquare
 * @classdesc Simple square obstacle for the player to collide with
 */
class ObstacleSquare{
    /**
    * @constructor
    * @desc Simple constructor
    */
    constructor(x, y, world, assetManager)
    {
      this.body = b2dCreateBox(x, y, 50, 50, world, true);
      console.log(assetManager.ImageAssets);
      this.image = assetManager.find(assetManager.ImageAssets, "wall_square");
      this.image.setPos(x, y);
    }
  
    getBody()
    {
      return this.body;
    }
  }
  