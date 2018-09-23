var player;
var gun;
var tower;
var game;
var bg;
var gameOverImage;
var playerSprite;
var gameOverVisable = false;

//var moveDist = 0;

var t;
function preload() {
  bg = loadImage("./img/grass2.png");
  playerSprite = loadImage("./img/farmer.png");
  gameOverImage = loadImage("./img/gameOver.png");
}

function gameOver(visable) {
  if (visable) {
    image(gameOverImage, 0, 0, width, height);
  }
}

function setup() {
  createCanvas(600, 600);
  player = Player(playerSprite,100,100);
  gun = Gun();
  game = Game();
t = Entity(100, 100, 50, 50, null, CORNER);

  tower = Tower(100, 100, 50, 50);
  game.setplayer(player);
  game.include(tower);

  background(50);
}

function draw() {
  background(bg);

  player.move();
  player.tileMovement();

  gun.show();
  var a = player.player;//Entity(mouseX, mouseY, 30, 30, null, CORNER);
  // a.pos.y += 100;
  var b = t;
  rect(a.pos.x, a.pos.y, a.w, a.h); 
  var apos = a.pos.copy();
  
  if(collideRectRect(apos.x, apos.y, a.w, a.h,   b.pos.x, b.pos.y, b.w, b.h)){
    print("up true");
    player.player.y += 100;
  }else{
    print("up false");
  }
  game.run();
  fill(color("white"));
  textSize(30);
  text("Arrows, and Z to shoot", 100, height - 60);
  gameOver(gameOverVisable);
}

function keyPressed() {
  if (key === "Z") {
    var t = player.player.pos.copy()
    var dir = player.player.direction;
    //
    //starting x,y, and Direction to fire ex: "up","down","right"
    gun.fire(t.x, t.y, dir);

    print("shoot");
  }
  
  if(key === "=") {
    gameOverVisable = true;
  }
  if(keyCode === RIGHT_ARROW) {
    player.player.pos.x += 100;
  }
  if(keyCode === UP_ARROW) {
    player.player.pos.y -= 100;
  }
  if(keyCode === LEFT_ARROW) {
    player.player.pos.x -= 100;
  }
  if(keyCode === DOWN_ARROW) {
    player.player.pos.y += 100;
  }
}

function collide(a, b,func) {
  if (a && b) {
    func(collideRectRect(a.pos.x, a.pos.y, a.w, a.h, x, y, w, h));
  }
}
function mousePressed() {
}