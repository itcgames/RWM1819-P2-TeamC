/**
 * @class ObstacleCircle
 * @classdesc Simple circle obstacle for the player to collide with
 */
class ObstacleCircle{
  /**
  * @constructor
  * @desc Simple constructor
  */
  constructor(x, y, world, assetManager, sprite) {
    this.body = b2dCreateCircle(x, y, 50, world, true);
    this.image = assetManager.find(assetManager.ImageAssets, sprite);
    this.image.setPos(x - 50, y - 50);
    this.image.setActive(true);
  }

  getBody() {
    return this.body;
  }
}
