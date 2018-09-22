p5.prototype.Bullet = function(x, y, w, h){
  return new createBullet(x, y, w, h);
}

function createBullet(x, y, w, h){
  this.bullet = Entity(x||undefined, y||undefined, w||undefined, h||undefined);
  
  this.bulletEffect = function(){
    bullet.bullet.movetotarget(createVector(mouseX,mouseY),0.01);
    push();
        ellipseMode(this.bullet.MODE);
        angleMode(DEGREES);
        translate(this.bullet.pos.x, this.bullet.pos.y);

    		ellipse(0,0,this.bullet.w,this.bullet.h);
  			fill(255,50,2,150);
  			ellipse(random(-1.5,1.5),1*5, this.bullet.w,this.bullet.h);
  			fill(170,13,8,75);
  			ellipse(random(-1.5,1.5),2*5, this.bullet.w,this.bullet.h);
  		pop();
  }
}