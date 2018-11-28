/**
 * @class ObstacleCircle
 * @classdesc Simple circle obstacle for the player to collide with
 */
class ObstacleCircle{
  /**
  * @constructor
  * @desc Simple constructor
  */
  constructor(x, y, world, assetManager)
  {
    this.body = b2dCreateCircle(x, y, 50, world, true);
    this.image = assetManager.find(assetManager.ImageAssets, "wall_circle");
    this.image.setPos(x, y);
  }

  getBody()
  {
    return this.body;
  }
}
