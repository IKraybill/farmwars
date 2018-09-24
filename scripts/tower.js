p5.prototype.Tower = function(x, y, w, h,img){
  return new createTower(x, y, w, h,img);
}
function createTower(x, y, w, h,img) {
    // this.baseTower = Entity(x, y, w, h, null, CORNER);
                              // x, y, w, h, Color, mode, speed, angle, debug, name, type, img
    this.pos = createVector(x , y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.upperTower = Entity(x, y , w , h , "blue", CORNER, null, null, null, null, "image", img);          
    // this.upperTower = Entity(x + w * 0.5, y + h * 0.5, w * 0.5, h * 0.5, "blue", CORNER, null, null, null, null, "image", img);

	this.w = w;
	this.h = h;
	this.gun = Gun();

	this.show = function() {
		if(frameCount % 250 === 0){
			this.fire();
		}
		this.baseTower.show();
		this.upperTower.show();
		this.gun.show();
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
		this.gun.fire(this.pos.x, this.pos.y + this.h / 2.0, this.randomDirection());
	}
}