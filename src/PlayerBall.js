/**
 * @class PlayerBall
 * @classdesc Class to model the player's ball
 */
class PlayerBall{
  /**
  * @constructor
  * @desc Simple constructor
  */
  constructor(world, positionX, positionY, radius)
  {
    this.body = b2dCreateCustomCircle(positionX, positionY, radius, world, 0.1);
    this.body.m_linearDamping = 0.975;
    this.body.m_angularDamping = 0.98;

    this.standardFriction = 0.975;
    this.sandFriction = 0.78;
  }
  
  getBody()
  {
    return this.body;
  }
}
