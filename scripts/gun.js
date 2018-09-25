p5.prototype.Gun = function() {
  return new GUN();
}

function GUN() {
  this.bullets = [];
  this.currentDirection = "stop";
  this.shoot = function(x, y) {
    if (this.currentDirection !== "stop") {
      var b = Bullet(x, y, 5, 15)
      b.bullet.MODE = CORNER;
      b.bullet.type = "bullet";


      b.bullet.pos = createVector(x, y);
      b.shoot(this.currentDirection);

      this.bullets.push(b.bullet);
    }
  }
  this.fire = function(x, y,direction) {
    this.currentDirection = direction;
    this.shoot(x, y);
  }

  this.show = function(){
    for (var i = 0; i < this.bullets.length; i += 1) {
      //check if the entitis array has objects within it
      if(this.bullets && this.bullets[i]){
        this.bullets[i].run();
        this.despawn(this.bullets[i],i);
      }
     }
  }
  this.bulletOnhit = function(target,callback){
    for (var i = 0; i < this.bullets.length; i += 1) {
      if(this.bulletCollision(target,i)){
        callback(i);
      }
    }
  }
 this.bulletCollision = function(a,i) {
   if(this.bullets.length>0){
    var b = this.bullets[i];
    return collideRectRect(a.pos.x, a.pos.y, a.w, a.h,   b.pos.x, b.pos.y, b.w, b.h);
   }
  }
      this.destroy = function(name) {
       try{
          if (Number.isInteger(name) === true) {
            if (name >= 0 && name < this.bullets.length) {
              //remove item 'name' = 1 means remove bullets[1]
              this.bullets.splice(name, 1);
            }
          }
      }catch(e){
        console.error("ERROR:this.bullets was empty"+e)
      }
    }
    
    this.despawn = function(entity,i){
      if(entity.screenwraped()){
        print("Deleted: " + i);
        this.destroy(i);
      }
    }
  
}