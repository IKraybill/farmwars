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

  this.fire = function(input) {
    var t = input.player.pos.copy()
    var dir = input.player.direction;
    if (dir !== "stop") {
      this.add(t.x, t.y, dir);
    }
  }

  this.show = function() {
    this.game.run();
  }
}