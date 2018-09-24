var player;
var gun;
var tower;
var game;
var bg;
var gameOverImage;
var playerSprite;
var gameOverVisable = false;

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

  tower = Tower(100, 100,100, 100 );
  game.setplayer(player);
  game.include(tower);

  background(50);
}

function draw() {
  background(bg);

  player.move();
  player.tileMovement();

  tower.show();
  gun.show();
  gun.bulletOnhit(tower.baseTower, function(del){
    gun.destroy(del);
    
    //add boom effect
    //add shake affect
  });
  
  
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

function bulletCollision (a,b) {

  return collideRectRect(a.pos.x, a.pos.y, a.w, a.h,   b.pos.x, b.pos.y, b.w, b.h);
}
function keyPressed() {
  if (key === "Z") {
    var playerPos = player.player.pos.copy()
    //
    //starting x,y, and Direction to fire ex: "up","down","right"
    gun.shoot(playerPos.x+(player.player.w/2), playerPos.y+(player.player.w/2));

    print("shoot");
  }
  
  if(key === "=") {
    gameOverVisable = true;
  }
  if(keyCode === RIGHT_ARROW) {
    
    if(!playerCollision(player.player,tower.baseTower,100,0)){
      player.player.pos.x += 100;
    }
    
    gun.currentDirection = "right";
  }
  if(keyCode === UP_ARROW) {
    if(!playerCollision(player.player,tower.baseTower,0,-100)){
      player.player.pos.y -= 100;
    }
    gun.currentDirection = "up";
  }
  if(keyCode === LEFT_ARROW) {
    if(!playerCollision(player.player,tower.baseTower,-100,0)){
      player.player.pos.x -= 100;
    }
    gun.currentDirection = "left";
  }
  if(keyCode === DOWN_ARROW) {
    if(!playerCollision(player.player,tower.baseTower,0,100)){
      player.player.pos.y += 100;
    }
    gun.currentDirection = "down";
  }
  print(this)
}


function collide(a, b,func) {
  if (a && b) {
    func(collideRectRect(a.pos.x, a.pos.y, a.w, a.h, x, y, w, h));
  }
}
function mousePressed() {
}