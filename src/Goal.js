class Goal{
  /**
  * @constructor
  * @desc Simple constructor
  */
  constructor(positionX, positionY, radius)
  {
    this.posX = positionX;
    this.posY = positionY;
    this.radius = radius;
  }
  draw(ctx)
  {
    ctx.beginPath();
    ctx.arc(this.posX,this.posY,this.radius,0,2*Math.PI);
    ctx.stroke();
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
