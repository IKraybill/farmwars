p5.prototype.Tower = function(x, y, w, h,img){
	return new createTower(x, y, w, h,img);
}
function createTower(x, y, w, h,img) {
  // x, y, w, h, Color, mode, speed, angle, debug, name, type, img
  // x, y, w, h, null, mode, null, null, null, null, type, img
	this.baseTower = Entity(x, y, w, h, null, CORNER, null, null, null, null, "image", img);
// 	this.upperTower = Entity(x + w * 0.5, y + h * 0.5, w * 0.5, h * 0.5, "blue", CENTER,img);
	this.pos = createVector(x , y);
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);

	this.w = w;
	this.h = h;
	this.shooter = Gun();

	this.show = function() {
		this.baseTower.show();
		this.shooter.show();
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

	this.randomDirection = function(){
		return random(["right", "left", "up", "down"]);
	}

	this.fire = function(){
		this.shooter.fire(this.pos.x, this.pos.y, this.randomDirection());
	}
}