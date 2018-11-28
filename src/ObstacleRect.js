/**
 * @class ObstacleRect
 * @classdesc Simple rectangle obstacle for the player to collide with
 */
class ObstacleRect{
  /**
  * @constructor
  * @desc Simple constructor
  */
  constructor(x, y, world, assetManager)
  {
    this.body = b2dCreateBox(x, y, 50, 75, world, true);
    this.image = assetManager.find(assetManager.ImageAssets, "wall_rect_vertical");
    this.image.setPos(x - 50, y - 75);
    this.image.setActive(true);
  }

  getBody()
  {
    return this.body;
  }
}
