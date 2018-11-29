class Terrain{

  constructor(x,y, w, h){
    this.pos = {
      x: x,
      y: y,
    };

    this.size = {
      w: w,
      h: h,
    };

    this.testBool = false;
  }

  /**
   * Checks if a circle is within an AABB
   * @param x x-coordinate of circle origin
   * @param y y-coordinate of circle origin
   * @param radius
   * @returns {boolean} If it collides
   */
  checkCollision(x,y,radius){
    // Find closest point P
    // Initialised to circle's center

    console.log(x);
    console.log(y);
    console.log(radius);
    let p = {
      x: x,
      y: y,
    };

    if (x < this.pos.x){
      p.x = this.pos.x;
    }
    if (x > this.pos.x + this.size.w){
      p.x = this.pos.x + this.size.w;
    }
    if (y < this.pos.y){
      p.y = this.pos.y;
    }
    if (y > this.pos.y + this.size.h){
      p.y = this.pos.y + this.size.h;
    }

    const dist = Math.sqrt((x - p.x) * (x - p.x) + (y - p.y) * (y - p.y));

    if (dist < radius){
      this.testBool = true;
      return true;
    }
    else{
      this.testBool = false;
      return false;
    }
  }

  draw(ctx){
    if(this.testBool) {
      ctx.fillStyle = "#ff0000";
    }
    else{
      ctx.fillStyle = "#ffffff";
    }
    ctx.fillRect(
      this.pos.x,
      this.pos.y,
      this.size.w,
      this.size.h,
    );
  }
}