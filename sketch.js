var player;
var game;
var bullet;




var target;
function setup() {
  createCanvas(600, 600);
  game = Game();
  player = Player();
  //x, y, w, h, Color, mode, speed, angle, debug, name, type, img
  bullet = Bullet(0,0,5,15);
  var b2 = Bullet(100,100,5,15);

  bullet.bullet.visable = false;
  bullet.bullet.MODE = CENTER;
  game.include(b2.bullet);
  game.include(bullet.bullet);
  game.setplayer(player.player);
  
  target = bullet.bullet.pos.copy();
  
  background(50);
}

function draw() {
  background(50);



  player.move();
  
  
  player.tileMovement();

  bullet.run();
  game.display();
  // game.run();
  fill(color("white"));
  textSize(30);
text("Arrows, and Z to shoot",100,100);
}
function keyPressed(){
  if(key === "Z"){
    //shoot\

    bullet.bullet.pos = player.player.pos.copy();
    bullet.shoot(player.player.direction);
    print("shoot");
  }
  print(key);
}
function mousePressed(){
  // bullet.shoot("up");
  // bullet.shoot("right");
  // bullet.shoot("left");
  // bullet.shoot("down");
  // print(bullet);
}