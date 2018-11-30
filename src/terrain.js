class Terrain{

  constructor(x,y, w, h, type, assetManager, sprite){
    this.pos = {
      x: x,
      y: y,
    };

    this.size = {
      w: w,
      h: h,
    };

    this.typeList = {
      "Sandtrap": 1,
      "Water": 2,
    };
    this.type = type;

    this.testBool = false;

    this.image = assetManager.find(assetManager.ImageAssets, sprite);


    this.image.setPos(this.pos.x , this.pos.y );
    this.image.setActive(true);

  }

  /**
   *
   * @returns {*}
   */
  getType(){
    return this.typeList[this.type];
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

    // Find the distance between the origin (x,y) and the closest point (P)
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
    if(this.type === "Sandtrap") {
      ctx.fillStyle = "#ffca77";
    } else if(this.type === "Water"){
      ctx.fillStyle = "#8acdff";
    }
    //ctx.fillRect(
    //  this.pos.x,
    //  this.pos.y,
      //this.size.w,
      //this.size.h,
    //);
  }
}
