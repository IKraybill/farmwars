p5.prototype.Tower = function(x, y, w, h){
  return new createTower(x, y, w, h);
}
function createTower(x, y, w, h) {
    this.baseTower = Entity(x, y, w, h, null, CORNER);
    this.upperTower = Entity(x + w * 0.5, y + h * 0.5, w * 0.5, h * 0.5, "blue", CENTER);
    this.pos = createVector(x , y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.w = w;
    this.h = h;
    this.bullets = [];

    this.show = function() {
        this.baseTower.show();
        this.upperTower.show();
    }
    this.movement = function() {
    }

    this.screenwrap = function(){
    }

    this.run = function() {
      this.movement();
      this.show();
    }
    this.bullet = function(){
    }
    this.fire = function(){
    }
  }