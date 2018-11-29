/**
 * @class PlayerBall
 * @classdesc Class to model the player's ball
 */
class PlayerBall{
  /**
  * @constructor
  * @desc Simple constructor
  */
  constructor(world, positionX, positionY, radius, assetManager) {
    this.body = b2dCreateCustomCircle(positionX, positionY, radius, world, 0.1);
    this.body.m_linearDamping = 0.975;
    this.body.m_angularDamping = 0.98;

    this.standardFriction = 0.975;
    this.sandFriction = 0.78;
    this.startPos = {
      x: this.body.GetCenterPosition().x,
      y: this.body.GetCenterPosition().y,
    };

    var vec = new b2Vec2(this.body.GetLinearVelocity().x, this.body.GetLinearVelocity().y);
    vec.Normalize();
    this.emitter = new Emitter(new Vector(800, 530), Vector.fromAngle(0.10, 1), 10 ,'rgb(0,200,0)');
    //this.emitter.color = 'rgb(255,0,0)';
    this.emitter.setParticlesLifeTime(1);
    this.emitter.setEmissionRate(0);
    this.emitter.setMaxParticles(100000);

    this.image = assetManager.find(assetManager.ImageAssets, "ball");
    this.image.setPos(positionX - 20, positionY - 20);
    this.image.setActive(true);

    this.shotNumber = 0;
    this.score = 0;
  }
  update(width, height) {
    this.emitter.addNewParticles();
    this.emitter.plotParticles(width, height);
    this.emitter.setPos(this.body.GetCenterPosition().x, this.body.GetCenterPosition().y);

    var vec = new b2Vec2(this.body.GetLinearVelocity().x, this.body.GetLinearVelocity().y);
    //vec.Normalize();
    var mag = Math.sqrt((vec.x * vec.x) + (vec.y * vec.y));
    var newEmission = mag / 50;
    newEmission = newEmission < 1 ? 0 : newEmission;
    this.emitter.setEmissionRate(newEmission);

    this.image.setPos(this.body.GetCenterPosition().x - 20, this.body.GetCenterPosition().y- 20);
    var rotMat = this.body.m_R;
    var vec = rotMat.col1;
    var angle = Math.atan2(vec.y, vec.x);
    this.image.rotate = angle;
    //this.emitter.setParticlesLifeTime(1);
  }

  draw(ctx) {
    this.emitter.draw(ctx);
  }

  getBody() {
    return this.body;
  }
}
