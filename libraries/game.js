//simple game making library
//by wisemonkey
//20180916
//email oranbusiness@gmail.com
//github.com/wisehackermonkey

//todo 
//[]fix angle bug with when mating velocity and angle
//[x] box collision
//[] fix bug with rotation and collision
//[] collision groups
(function() {

  // check if input is a function source 
  // https://stackoverflow.com/a/7356528/5460870
  function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
  }

  // https://stackoverflow.com/a/9815010/5460870
  // Array Remove - By John Resig (MIT Licensed)
  Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
  };

  /*
  Created by http://benmoren.com
  Some functions and code modified version from http://www.jeffreythompson.org/collision-detection
  GNU LGPL 2.1 License
  Version 0.1 | January 10th, 2016
  */
  p5.prototype.collideRectRect = function(x, y, w, h, x2, y2, w2, h2) {
    //2d
    //add in a thing to detect rectMode CENTER
    if (x + w >= x2 && // r1 right edge past r2 left
      x <= x2 + w2 && // r1 left edge past r2 right
      y + h >= y2 && // r1 top edge past r2 bottom
      y <= y2 + h2) { // r1 bottom edge past r2 top
      return true;
    }
    return false;
  };

  p5.prototype.collideRectCircle = function(rx, ry, rw, rh, cx, cy, diameter) {
    //2d
    // temporary variables to set edges for testing
    var testX = cx;
    var testY = cy;

    // which edge is closest?
    if (cx < rx) {
      testX = rx // left edge
    } else if (cx > rx + rw) {
      testX = rx + rw
    } // right edge

    if (cy < ry) {
      testY = ry // top edge
    } else if (cy > ry + rh) {
      testY = ry + rh
    } // bottom edge

    // // get distance from closest edges
    var distance = this.dist(cx, cy, testX, testY)

    // if the distance is less than the radius, collision!
    if (distance <= diameter / 2) {
      return true;
    }
    return false;
  };

  function DefaultImage() {
    var img = createImage(66, 66);
    img.loadPixels();
    for (var i = 0; i < img.width; i++) {
      for (var j = 0; j < img.height; j++) {
        img.set(i, j, color(map(j, 0, img.height, 0, 255), 90, 102));
      }
    }
    img.updatePixels();
    return img;
  }
  p5.prototype.Game = function() {
    return new Game();
  }


  function Game() {
    this.entities = [];
    this.group = [];
    this.player;
    
    // this.screenwrap = false;
    this.willdespawn = false;
    
    this.include = function(entity) {
      this.entities.push(entity);
    }
    this.setplayer = function(player){
      this.player = player;
    }
    this.display = function(){
     for (var i = 0; i < this.entities.length; i += 1) {
        this.entities[i].screenwrap();
        this.entities[i].run();
     }
    }
    this.run = function() {
      for (var i = 0; i < this.entities.length; i += 1) {
        if(this.willdespawn){
         this.despawn(this.entities[i],i);
        }
        if(this.entities && this.entities[i]){
          this.collisions(this.player,this.entities[i],function(a,b,result,gameObject){
            if(result){
              print("COllied");
              a.color = color("red");
              b.color = color("blue");
              gameObject.destroy(i);
            }
          });
          if(this.entities && this.entities[i]){
            this.entities[i].run();
          }
        }
      }
    }
    this.destroy = function(name) {
      if (Number.isInteger(name) === true) {
        if (name >= 0 && name < this.entities.length) {
          //remove item 'name' = 1 means remove entities[1]
          // this.entities.remove(name, 1);
          this.entities.splice(name, 1);
          
        }
      }
    }
    
    this.despawn = function(entity,i){
      if(entity.screenwraped()){
        print("Deleted: " + i);
        this.destroy(i);
      }
    }
    this.collisions = function(a,b,func){
      if(a&& b){
        func(a,b,collideRectRect(a.pos.x, a.pos.y, a.w, a.h, b.pos.x, b.pos.y, b.w, b.h),this);
      }
    }
  }

  p5.prototype.Entity = function(x, y, w, h, Color, mode, speed, angle, debug, name, type, img) {
    return new Entity(x, y, w, h, Color, mode, speed, angle, debug, name, type, img);
  }

  function Entity(x, y, w, h, Color, mode, speed, angle, debug, name, type, img) {
    this.pos = createVector(x || (width / 2), y || (height / 2));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.w = w || 10;
    this.h = h || 10;
    this.angle = angle || 0;
    this.speed = speed || 1;
    this.mass = 10;
    
    this.velStop = 0;
    
    this.color = Color || color("white");
    this.MODE = mode || CORNER;
    this.debug = debug || false;
    this.name = name || "default";
    this.type = type || "rect";

    if (typeof img === "string") {
      this.img = loadImage(img);
    } else {
      this.img = DefaultImage();
    }
    this.visable = true;
    
    var target = createVector(0, 0);
    var arrived = false;
    this.direction = "stop";
    this.show = function() {
      if(this.visable){
        push();
        angleMode(DEGREES);
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        rectMode(this.MODE);
        ellipse(this.MODE);
  
        fill(this.color);
  
        if (this.debug === true) {
          fill(random(255), random(255), random(255));
        }
        switch (this.type) {
          case "rect":
            rect(0, 0, this.w, this.h);
            break;
          case "circle":
            ellipse(0, 0, this.w, this.h);
            break;
          case "image":
  
            image(this.img, 0, 0, this.w, this.h);
            break;
          default:
            console.error("ERROR: Entity Type Not found");
        }
  
        pop();
      }
    }

    this.movement = function() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.vel.mult(this.velStop);
    }

    this.addforce = function(force) {
      //recieve a froce, devide by mass
      var f = p5.Vector.div(force, this.mass);
      //add to acceleration
      this.acc.add(f);
    }

    this.rotate = function() {
      this.angle = atan2(this.vel.x,this.vel.y);
    }

    this.mouse = function(offsetX, offsetY) {
      if (isFunction(offsetX)) {
        offsetX(this);
      } else {
        this.pos = createVector((mouseX + offsetX) || mouseX, (mouseY + offsetY) || mouseY);
      }
    }
    this.moveToPoint = function(x, y, steps) {
      this.pos.x = lerp(this.pos.x, x || 0, steps);
      this.pos.y = lerp(this.pos.y, y || 0, steps);
    }
    this.movetotarget = function(target, speed, func) {
      if (!arrived) {
        this.speed = speed || this.speed;
        this.target = target.copy();

        this.moveToPoint(this.target.x, this.target.y, this.speed);


        var diff = p5.Vector.sub(this.target, this.pos);
        this.angle = atan2(diff.x, diff.y);

        var distanceToTarget = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);
        if (distanceToTarget < 1) {
          arrived = true;
          if (isFunction(func)) {
            func(this);
          }
        }
      }
    }

    this.screenwrap = function() {
      var w = this.w;
      var h = this.h;
      var x = this.pos.x;
      var y = this.pos.y;
      if (x > width + w * 2) {
        this.pos.set(0, y);
        return true;
      }
      if (x < -w) {
        this.pos.set(width + w, y);
        return true;
      }

      if (y > height + h * 2) {
        this.pos.set(x, 0);
        return true;
      }
      if (y < -h) {
        this.pos.set(x, height);
        return true;
      }
    }
    this.screenwraped = function() {
      var w = this.w;
      var h = this.h;
      var x = this.pos.x;
      var y = this.pos.y;
      if (x > width + w * 2) {
        return true;
      }
      if (x < -w) {
        return true;
      }

      if (y > height + h * 2) {
        return true;
      }
      if (y < -h) {
        return true;
      }
    }
    this.arrowkeys = function(right, left, up, down) {
      
      
      if (keyIsDown(RIGHT_ARROW)) {
        this.direction = "right";
        if (isFunction(right)) {
          right(this);
        } else {
          this.vel.x = right || 1;
        }
      }

      if (keyIsDown(LEFT_ARROW)) {
        this.direction = "left";
        if (isFunction(left)) {
          left(this);
        } else {
          this.vel.x = left || -1;
        }
      }

      if (keyIsDown(UP_ARROW)) {
        this.direction = "up";
        if (isFunction(up)) {
          up(this);
        } else {
          this.vel.y = up || -1;
        }
      }
      if (keyIsDown(DOWN_ARROW)) {
        this.direction = "down";
        if (isFunction(down)) {
          down(this);
        } else {
          this.vel.y = down || 1;
        }
      }
    }

    this.run = function() {
      // this.rotate();
      this.movement();
      this.show();
    }
  }

})();