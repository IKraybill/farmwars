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
  bullet.bullet.visable = false;
  bullet.bullet.MODE = CENTER;
  // game.include(bullet.bullet);
  game.setplayer(player.player);
  
  target = bullet.bullet.pos.copy();
  
  background(50);
}

function draw() {
  background(50);
  bullet.bulletEffect();
  // bullet.bullet.angle;
  player.move();
  player.tileMovement();


  game.display();

}

function mousePressed(){
  target = createVector(mouseX,mouseY);
}