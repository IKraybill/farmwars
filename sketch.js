var player;
var gun;
var tower;
var game;
var bg;
var playerSprite;

function preload(){
  bg = loadImage("./img/grass2.png");
  playerSprite = loadImage("./img/farmer.png");
}

function setup() {
  createCanvas(600, 600);
  player = Player(playerSprite);
  gun = Gun();
  game = Game();
  

  tower = Tower(100, 100, 50, 50);
  game.setplayer(player);
  game.include(tower);
  
  background(50);
}

function draw() {
  background(bg);
  // image(bg,0,0);
  
  player.move();
  player.tileMovement();

  gun.show();

  game.run();
  fill(color("white"));
  textSize(30);
  text("Arrows, and Z to shoot",100,height-60);
}

function keyPressed(){
  if(key === "Z"){
    var t = player.player.pos.copy()
    var dir = player.player.direction;
    //
    //starting x,y, and Direction to fire ex: "up","down","right"
    gun.fire(t.x, t.y, dir);

    print("shoot");
  }
}

function mousePressed(){
}
