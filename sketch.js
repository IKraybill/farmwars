var player;
var gun;
var tower;
var game;
var bg;
var house;

var gameOverImage;
var playerSprite;
var gameOverVisable = false;


var t;
function preload() {
  bg = loadImage("./img/grass2.png");
  house = loadImage("./img/house1.png");
  
  playerSprite = loadImage("./img/front_man.png");
  gameOverImage = loadImage("./img/gameOver.png");
}

function gameOver(visable) {
  if (visable) {
    image(gameOverImage, 0, 0, width, height);
  }
}

function setup() {
  createCanvas(600, 600);
  noSmooth();
  player = Player(playerSprite,100,300,100,100);
  gun = Gun();
  game = Game();

  tower = Tower(100, 100, 100, 100, house);
  game.setplayer(player);
  game.include(tower);

  background(50);
}

function draw() {
  background(bg);
  var a = player.player;//Entity(mouseX, mouseY, 30, 30, null, CORNER);
  // a.pos.y += 100;
  var b = t;
  // rect(a.pos.x, a.pos.y, a.w, a.h);
  // rect(a.pos.x, a.pos.y,5,5);
 
  player.move();
  player.tileMovement();
  
  tower.upperTower.run();
  
  gun.show();
  // print(playerCollision(a,tower.upperTower))
  // playerCollision(a,tower.upperTower)
bulletCollsion(gun,tower.upperTower)  
  game.run();
  fill(color("white"));
  textSize(30);
  text("Arrows, and Z to shoot", 100, height - 60);
  gameOver(gameOverVisable);
}
function bulletCollsion(bulletArray,targer){
    
  // var apos = a.pos.copy();
  try{
    var apos = gun.bullets[0].bullet.pos.copy();
    collideRectRect(apos.x, apos.y , a.w, a.h,   b.pos.x, b.pos.y, b.w, b.h);
    collideRectRect()
    
  }catch(e){
    console.error("ERROR: bulletCollsion() :"+e);
  }
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
    //
    //starting x,y, and Direction to fire ex: "up","down","right"
    gun.fire(playerPos.x, playerPos.y);

    print("shoot");
  }
  
  if(key === "=") {
    gameOverVisable = true;
  }
  if(keyCode === RIGHT_ARROW) {
    
    if(!playerCollision(player.player,tower.upperTower,100,0)){
      player.player.pos.x += 100;
    }
    
    gun.currentDirection = "right";
  }
  if(keyCode === UP_ARROW) {
    if(!playerCollision(player.player,tower.upperTower,0,-100)){
      player.player.pos.y -= 100;
    }
    gun.currentDirection = "up";
  }
  if(keyCode === LEFT_ARROW) {
    if(!playerCollision(player.player,tower.upperTower,-100,0)){
      player.player.pos.x -= 100;
    }
    gun.currentDirection = "left";
  }
  if(keyCode === DOWN_ARROW) {
    if(!playerCollision(player.player,tower.upperTower,0,100)){
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
  var playerPos = player.player.pos.copy()
  gun.fire(playerPos.x, playerPos.y);
}