/**
 * @class ObstacleSquare
 * @classdesc Simple square obstacle for the player to collide with
 */
class ObstacleSquare{
  
  /**
  * @constructor
  * @desc Simple constructor
  */
  constructor(x, y, rotation, world, assetManager, sprite)
  {
    var radians = rotation * Math.PI / 180;
    this.body = b2dCreateBox(x, y, 66, 66, world, true);
    this.body.SetOriginPosition(this.body.GetCenterPosition(), radians);
    this.image = assetManager.find(assetManager.ImageAssets, sprite);
    this.image.setPos(x - 66, y - 66);
    this.image.rotate = radians;
    this.image.setActive(true);
  }

  getBody() {
    return this.body;
  }
}
  