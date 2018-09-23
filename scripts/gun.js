p5.prototype.Gun = function(){
  return new gun();
}

function gun(){
  this.bullets = [];
  this.add = function(x,y){
    var b = Bullet(x, y, 5,15)
    b.bullet.visable = false;
    b.bullet.MODE = CENTER;
    this.bullets.push(b);
    print(this.bullets);
  }
  this.shoot =  function(direction){
    if(direction === "up"){
      this.direction = 0;
      this.bullet.vel = createVector(0,-1);
    }
    if(direction === "right"){
      this.direction = 90;
      this.bullet.vel = createVector(1,0);
    }
  }
  this.show = function(){
    for (var i = 0; i < this.bullets.length; i += 1) {
    }
  }
}