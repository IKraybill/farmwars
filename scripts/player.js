p5.prototype.Player = function(img,w,h) {
  return new createPlayer(img,w,h);
}

function createPlayer(img,w,h) {
  // x, y, w, h, Color, mode, speed, angle, debug, name, type, img
  this.player = Entity(0, 0,w,h,null, CENTER, null, null, null, null, "image", img);
  this.player.type = "image";
  this.player.MODE = CORNER;
  this.player.img = img;
  
  this.speed = w;

  this.direction = "stop";

  this.tileMovement = function() {
    push();
      /*var sc = width / 10;
      var p = locatePlayer(this.player.pos.x, this.player.pos.y, 15, 15);
      fill(150, map(this.player.pos.x, 0, width, 255, 0), map(this.player.pos.y, 0, width, 0, 255));
      rect(p.x, p.y , sc, sc);
      image(playerSprite,p.x , p.y , 50,100);*/
      image(playerSprite,this.player.pos.x , this.player.pos.y , 50,100);
      
    pop();
  }

  this.move = function(item) {
    // rect(this.player.pos.x-100, this.player.pos.y-100, 200, 200)
    // this.player.arrowkeys(this.speed, -this.speed, -this.speed, this.speed);
    // this.player.arrowkeys(function(movement){
    //   movement.vel.x +=1;
    //   movement.direction ="left";
    // },-this.speed,-this.speed,this.speed);

    this.player.screenwrap();
    this.player.movement();
  }

  function live(x, y) {
    var sc = width / 15;
    var p = FindPos(x, y, 15, 15);
    if (p) {
      fill(255, map(x, 0, width, 255, 0), map(x, 0, width, 0, 255));
      rect(p.x * sc, p.y * sc, sc, sc)
    }
  }

  function locatePlayer(mousex, mousey, numw, numh) {
    var x = mousex;
    var y = mousey;
    var w = width / numw;
    var h = height / numh;
    for (var i = 0; i < numw; i += 1) {
      for (var j = 0; j < numh; j += 1) {
        if (x > w * i && x < w * i + w && y > h * j && y < h * j + h) {
          return {
            x: i,
            y: j,
            found: true
          };
        }
      }
    }
    return {
      x: mousex,
      y: mousey,
      found: false
    };
  }
}