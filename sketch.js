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
t = Entity(100, 100, 100, 100, null, CORNER);

  tower = Tower(100, 100, 50, 50);
  game.setplayer(player);
  //game.include(tower);

  background(50);
}

function draw() {
  background(bg);

  player.move();
  player.tileMovement();
t.run();
  gun.show();
  var a = player.player;//Entity(mouseX, mouseY, 30, 30, null, CORNER);
  // a.pos.y += 100;
  var b = t;
  rect(a.pos.x, a.pos.y, a.w, a.h);
  rect(a.pos.x, a.pos.y,5,5);
  // var apos = a.pos.copy();
  playerCollision(a,t)
  
  
  game.run();
  fill(color("white"));
  textSize(30);
  text("Arrows, and Z to shoot", 100, height - 60);
  gameOver(gameOverVisable);
}

function playerCollision (a,b,offsetx,offsety) {
  var apos = a.pos.copy();
  try{
  return collideRectRect(apos.x + offsetx+2, apos.y + offsety +2, a.w-4, a.h-4,   b.pos.x, b.pos.y, b.w, b.h);
  }catch(e){
    console.error("ERROR: playerCollision() function shit the bed"+e);
  }
}

function keyPressed() {
  if (key === "Z") {
    var playerPos = player.player.pos.copy()
    var dir = player.player.direction;
    //
    //starting x,y, and Direction to fire ex: "up","down","right"
    gun.fire(playerPos.x, playerPos.y, dir);

    print("shoot");
  }
  
  if(key === "=") {
    gameOverVisable = true;
  }
  if(keyCode === RIGHT_ARROW) {
    
    if(!playerCollision(player.player,t,100,0)){
      player.player.pos.x += 100;
    }
  }
  if(keyCode === UP_ARROW) {
    if(!playerCollision(player.player,t,0,-100)){
      player.player.pos.y -= 100;
    }
    
  }
  if(keyCode === LEFT_ARROW) {
    if(!playerCollision(player.player,t,-100,0)){
      player.player.pos.x -= 100;
    }
    
  }
  if(keyCode === DOWN_ARROW) {
    if(!playerCollision(player.player,t,0,100)){
      player.player.pos.y += 100;
    }
    
  }
}


function collide(a, b,func) {
  if (a && b) {
    func(collideRectRect(a.pos.x, a.pos.y, a.w, a.h, x, y, w, h));
  }
}
function mousePressed() {
}