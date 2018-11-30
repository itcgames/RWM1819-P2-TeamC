class Goal {
  /**
   * @constructor
   * @desc Simple constructor
   */
  constructor(positionX, positionY, radius) {
    this.posX = positionX;
    this.posY = positionY;
    this.radius = radius;

    this.emitters = [new Emitter(new Vector(800, 530), 
      Vector.fromAngle(0.10, 3), 
      10, 'rgb(255,0,0)'), 
      
      new Emitter(new Vector(800, 530), 
      Vector.fromAngle(0.10, 3), 
      10, 'rgb(255,255,0)'),
      
      new Emitter(new Vector(800, 530), 
      Vector.fromAngle(0.10, 3), 
      10, 'rgb(0,0,255)')];

    for (var i = 0; i < this.emitters.length; i++) {
      this.emitters[i].setParticlesLifeTime(0.7);
      this.emitters[i].setEmissionRate(10);
      this.emitters[i].setMaxParticles(100000);
    }
    this.emit = false;
    this.particleTimer = 0;
  }

  draw(ctx) {
    for (var i = 0; i < this.emitters.length; i++) {
      this.emitters[i].draw(ctx);
    }
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

  update(width, height) {
    for (var i = 0; i < this.emitters.length; i++) {
      if (this.emit == true) {
        this.emitters[i].addNewParticles();
      }

      this.emitters[i].plotParticles(width, height);
      this.emitters[i].setPos(this.posX, this.posY);
    }
  }
  
  collision(p1x, p1y, r1) {
    var a;
    var x;
    var y;

    a = r1 + this.radius;
    x = p1x - this.posX;
    y = p1y - this.posY;

    if (a > Math.sqrt((x * x) + (y * y))) {
      return true;
    } else {
      return false;
    }
  }
}
