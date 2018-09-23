p5.prototype.Gun = function() {
  return new gun();
}

function gun() {
  this.bullets = [];
  this.currentDirection = "stop";
  this.fire = function(x, y) {
    if (this.currentDirection !== "stop") {
      var b = Bullet(x, y, 5, 15)
      b.bullet.MODE = CORNER;
      b.bullet.type = "bullet";


      b.bullet.pos = createVector(x, y);
      b.shoot(this.currentDirection);

      this.bullets.push(b.bullet);
    }
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