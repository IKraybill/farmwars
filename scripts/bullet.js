p5.prototype.Bullet = function(x, y, w, h) {
  return new createBullet(x, y, w, h);
}

function createBullet(x, y, w, h) {
  this.bullet = Entity(x || undefined, y || undefined, w || undefined, h || undefined);

  this.bullet.velStop = 1;
  this.direction = 0;
  this.speed = 3;
  this.shoot = function(dir) {
    if (dir === "down") {
      this.direction = 180;
      this.bullet.vel = createVector(0, this.speed);
    }
    if (dir === "up") {
      this.direction = 0;
      this.bullet.vel = createVector(0, -this.speed);
    }
    if (dir === "right") {
      this.direction = 90;
      this.bullet.vel = createVector(this.speed, 0);
    }
    if (dir === "left") {
      this.direction = 270;
      this.bullet.vel = createVector(-this.speed, 0);
    }
    
    if (dir === "stop") {
      this.direction = 0;
      this.bullet.vel = createVector(0, 0);
    }
    this.bullet.angle=this.direction;


  }

  this.effect = function() {
    push();
      ellipseMode(this.bullet.MODE);
      angleMode(DEGREES);
      translate(this.bullet.pos.x, this.bullet.pos.y);
      rotate(this.direction);
  
      ellipse(0, 0, this.bullet.w, this.bullet.h);
      fill(255, 50, 2, 150);
      ellipse(random(-1.5, 1.5), 1 * 5, this.bullet.w, this.bullet.h);
      fill(170, 13, 8, 75);
      ellipse(random(-1.5, 1.5), 2 * 5, this.bullet.w, this.bullet.h);
    pop();
  }

  this.move = function() {
    this.bullet.movement();
  }
  this.run = function(){
      this.effect();
      this.move();
  }
}