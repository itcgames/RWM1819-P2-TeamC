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
    this.body = b2dCreateCircle(x, y, 191, world, true);
    this.image = assetManager.find(assetManager.ImageAssets, "wall_circle");
    this.image.setPos(x - 50, y - 50);
    this.image.setActive(true);
  }

  getBody()
  {
    return this.body;
  }
}
