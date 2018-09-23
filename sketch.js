var player;

var bullets = [];
var tower;
var gun;


function setup() {
  createCanvas(600, 600);
  player = Player();
  gun = Gun();


  // game.include(bullet.bullet);
  game.setplayer(player.player);
  
  // target = bullet.bullet.pos.copy();
  
  // for (var i = 0; i < this.bullets.length; i += 1){
  //   if(this.bullets[i]){
  //       this.bullets[i].bullet.visable = false;
  //       this.bullets[i].bullet.MODE = CENTER;
  //       game.include(this.bullets[i]);
  //   }
  // }
  tower = Tower(100, 100, 50, 50);
  game.include(tower);

  background(50);
}

function draw() {
  background(50);
  player.move();
  player.tileMovement();

  gun.show();

  fill(color("white"));
  textSize(30);
  text("Arrows, and Z to shoot",100,height-60);
}

function keyPressed(){
  if(key === "Z"){
    var t = input.player.pos.copy()
    var dir = input.player.direction;
    //
    //starting x,y, and Direction to fire ex: "up","down","right"
    gun.fire(t.x,t.y, dir);

    print("shoot");
  }
}

function mousePressed(){
}
