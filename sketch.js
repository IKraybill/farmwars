var player;
var gun;
var tower;


function setup() {
  createCanvas(600, 600);
  player = Player();
  gun = Gun();

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
