var player;
var game;
// var bullet;

var bullets = [];



// var target;

function setup() {
  createCanvas(600, 600);
  game = Game();
  player = Player();
  //x, y, w, h, Color, mode, speed, angle, debug, name, type, img
  // bullet = Bullet(0,0,5,15);
  // bullet.bullet.visable = false;
  // bullet.bullet.MODE = CENTER;


  // game.include(bullet.bullet);
  game.setplayer(player.player);
  
  // target = bullet.bullet.pos.copy();
  
  // for (var i = 0; i < this.bullets.length; i += 1){
  //   if(this.bullets[i]){
  //       this.bullets[i].bullet.visable = false;
  //       this.bullets[i].bullet.MODE = CENTER;
  //       game.include(this.bullets[i]);
  //   }
  // }

  background(50);
}

function draw() {
  background(50);



  player.move();
  player.tileMovement();
  for (var i = 0; i < this.bullets.length; i += 1){
      if(this.bullets.length > 0){
          // this.bullets[i].run();
       
        this.bullets[i].effect();
        this.bullets[i].move();
      }
  }

  // game.display();
  game.run();
  fill(color("white"));
  textSize(30);
  text("Arrows, and Z to shoot",100,100);
}
function keyPressed(){
  if(key === "Z"){
    //shoot\     x, y, w, h, Color, mode, speed, angle, debug, name, type, img
    var b = Bullet(10,10,10,25);
    // b.bullet.visable = false;
    b.bullet.MODE = CENTER;
    b.bullet.type = "bullet";
    b.bullet.rotate(180);
    b.bullet.pos = player.player.pos.copy();
    b.shoot(player.player.direction);
    bullets.push(b);
    // game.include(b.bullet);
    // bullet.bullet.pos = player.player.pos.copy();
    // bullet.shoot(player.player.direction);
    print("shoot");
  }
  print(key);
}
function mousePressed(){

}
