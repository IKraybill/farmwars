p5.prototype.Gun = function() {
  return new gun();
}

function gun() {
  this.game = Game();

  this.add = function(x, y, dir) {
    var b = Bullet(x, y, 5, 15)
    b.bullet.MODE = CENTER;
    b.bullet.type = "bullet";


    b.bullet.pos = createVector(x, y);
    b.shoot(dir);

    this.game.include(b.bullet);
  }

  this.fire = function(x,y,dir) {
   
    if (dir !== "stop") {
      this.add(x, y, dir);
    }
  }

  this.show = function() {
    this.game.run();
  }
}