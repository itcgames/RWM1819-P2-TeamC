/**
 * @class ObstacleRotor
 * @classdesc Simple rotating obstacle for the player to collide with
 */
class ObstacleRotor{
    /**
    * @constructor
    * @desc Simple constructor
    */
    constructor(x, y, world, assetManager, sprite) {
      this.body = b2dCreateRotor(x, y, 12.5, 75, world, true);
      this.image = assetManager.find(assetManager.ImageAssets, sprite);
      this.image.setPos(x - 12.5, y - 75);
      this.image.setActive(true);
    }
  
    // Needs to be called for the sprite to rotate
    updateSprite() {
        // Can only get the matrix for rotation so some maths are required
        var rotMat = this.body.m_R;
        var vec = rotMat.col1;
        var angle = Math.atan2(vec.y, vec.x);
        this.image.rotate = angle;
    }

    getBody() {
      return this.body;
    }
  }
  