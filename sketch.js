var player;
var game;
var bullet;

function setup() {
  createCanvas(600, 600);
  game =  Game();
  player = Player();
  game.setplayer(player.player);
  background(50);
}

function draw() {
    background(50);



  game.run();
  player.move();
  player.tileMovement();
}

