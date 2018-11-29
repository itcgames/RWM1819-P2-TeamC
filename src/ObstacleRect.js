/**
 * @class ObstacleRect
 * @classdesc Simple rectangle obstacle for the player to collide with
 */
class ObstacleRect{
  
  /**
  * @constructor
  * @desc Simple constructor
  */
  constructor(x, y, rotation, world, assetManager, sprite) {
    var radians = rotation * Math.PI / 180;
    this.body = b2dCreateBox(x, y, 66, 99, world, true);
    this.body.SetOriginPosition(this.body.GetCenterPosition(), radians);
    this.image = assetManager.find(assetManager.ImageAssets, sprite);
    this.image.setPos(x - 50, y - 75);
    this.image.rotate = radians;
    this.image.setActive(true);
  }

  getBody() {
    return this.body;
  }
}
