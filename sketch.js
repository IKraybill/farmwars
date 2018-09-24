var player;
var gun;
var tower;
var game;
var bg;
var towerSprite;
var gameOverImage;
var playerSprite;
var gameOverVisable = false;
var tutorial;
var tutorialshow = true;

function preload() {
  bg = loadImage("./img/grass3.png");
  playerSprite = loadImage("./img/character.png");
  gameOverImage = loadImage("./img/gameOver.png");
  towerSprite = loadImage("./img/house1.png");
  tutorial = loadImage("./img/tutorial.png");
}

function gameOver(visable) {
  if (visable) {
    image(gameOverImage, 0, 0, width, height);
  }
}

function setup() {
  createCanvas(600, 600);
  noSmooth();
  player = Player(playerSprite,100,100);
  gun = Gun();
  game = Game();
  
  tower = Tower(100, 100,100, 100 ,towerSprite);
  game.setplayer(player);
  game.include(tower);

  background(50);
  // background(tutorial);
  noLoop();
}

function draw() {
  // background(tutorial);
  image(tutorial,100,150)
  if(!tutorialshow){  
    tutorialshow = false;
    background(bg);

  player.move();
  player.tileMovement();
  if(frameCount % 250 === 0){
  			tower.fire();
	}
  // tower.show();
  gun.show();
  gun.bulletOnhit(tower.baseTower, function(del){
    gun.destroy(del);
    
    //add boom effect
    //add shake affect
  });
  
  
  game.run();
  fill(color("white"));
  textSize(30);
  gameOver(gameOverVisable);
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

function bulletCollision (a,b) {

  return collideRectRect(a.pos.x, a.pos.y, a.w, a.h,   b.pos.x, b.pos.y, b.w, b.h);
}
function keyPressed() {
  if (key === " ") {
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
  loop();
  tutorialshow = false;
}