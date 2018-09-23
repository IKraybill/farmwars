var player;

var gun;


function setup() {
  createCanvas(600, 600);
  player = Player();
  gun = Gun();


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
    gun.fire(player);
    print("shoot");
  }
}

function mousePressed(){
}
