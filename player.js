/*
Name: Hyunjin.Kim (김현진)
Assignment Name: FINAL PROJECT
Course Number: cs099s20
Term & Year : spring / 2020

*/

class Player {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();

    this.r = 15 * 0.7;
    this.dashVisual = 0;
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    googly.color = Slider.colorPicker.color();

    //     googlypos.push([this.pos.x, this.pos.y]);

    //     if(googlypos.length > 10) {
    //        googlypos.splice(0, 1);
    //        }

    for (let i = 0; i < platforms.length; i++) {
      let checkx = this.pos.x > platforms[i].x &&
        this.pos.x < platforms[i].x + platforms[i].w;
      let checky = this.pos.y + this.r > platforms[i].y &&
        this.pos.y + this.r < platforms[i].y + platforms[i].h * 1.75;

      if (googly.IsStumping == false && (checkx && checky)) {
        this.pos.y = platforms[i].y - this.r;
        this.vel.mult(0);
        googly.state = 'ground';
        googly.dodged = false;
      }
      if (googly.IsStumping == true && (checkx && checky)) {
        this.vel.y *= -0.6;
        Sound.bounce.play();
        googly.IsStumping = false;
      }

    }

    if (googly.state == 'ground') {
      googly.JumpCount = 2;
    }

    if (googly.dodged == true) {
      googlypos.push([this.pos.x, this.pos.y]);
    }
    if (googly.dodged == false || googly.IsStumping == true) {
      googlypos.splice(0, googlypos.length);
    }

    if (this.pos.y < -World.highplat - 300) {
      InScenes.nowScene = 'win';
    }

    if (keyIsDown(27) && InScenes.seeVoid < 0) {
      InScenes.exitTime--;
      if (InScenes.exitTime < 0) {
        InScenes.mainAlpha = 255;
        InScenes.nowScene = 'mainMenu';
        World.havePlayed = true;
      }
      if(InScenes.exitTime == 0) {
         muteAll();
         Music.main.play();
         }
    }

    if (InScenes.seeVoid > 0) {
      googly.canMove = false;
    } else {
      googly.canMove = true;
    }
  }

  moving() {
    if (keyIsDown(65)) {
      this.pos.x -= 4.5;
      googly.lookat = 'left';
    }
    if (keyIsDown(68)) {
      this.pos.x += 4.5;
      googly.lookat = 'right';
    }

  }

  getForce(force) {
    this.acc = force;
  }

  show() {
    let x = this.pos.x;
    let y = this.pos.y;
    // let see = atan2(mouseY-height/2 - y, mouseX-width/2 - x);
    if (googly.lookat == 'left') {
      googly.eyepos = -3;
    }
    if (googly.lookat == 'right') {
      googly.eyepos = 3;
    }

    if (googly.IsStumping || (googly.state == 'ground' && keyIsDown(83)) ||
      abs(this.vel.y) > 7 || (player.pos.y < -World.highplat - 100 && abs(player.vel.y) > 3.7)) {
      googly.eye = '><';
    } else {
      googly.eye = 'oo';
    }

    if (googly.dodged == true) {
      push();
      noStroke();
      fill(255, 0, 0, 70);
      for (let i = googlypos.length; i > 0; i--) {
        this.dashVisual = googlypos.length - i;
        this.dashVisual = constrain(this.dashVisual, 0, 15);
        circle(googlypos[googlypos.length - i][0], googlypos[googlypos.length - i][1], this.dashVisual);
      }
      pop();
    }

    push();
    noStroke();
    fill(googly.color);
    translate(x, y);
    beginShape();
    var xoff = 0;
    for (let i = 0; i < TWO_PI; i += 0.1) {
      let n = map(noise(xoff, yoff), 0, 1, -2.3, 2.3);
      let hei = map(this.vel.y, -10, 10, this.r, this.r * 3) + n;
      let wid = map(this.vel.y, -10, 10, this.r * 3, this.r) + n;
      hei = constrain(hei, 15, 40);
      wid = constrain(wid, 15, 25);
      let x = wid * sin(i);
      let y = hei * cos(i);
      vertex(x, y);
      xoff += 0.1;
    }
    endShape(CLOSE);
    yoff += 0.06;
    pop();

    if (googly.eye == '><') {
      push();
      stroke('black');
      strokeWeight(4);
      strokeJoin(ROUND);
      translate(x, y - 3);
      line(-4, 0, -11, -6);
      line(-4, 0, -11, 6);
      line(4, 0, 11, 6);
      line(4, 0, 11, -6);
      pop();

    } else {

      push();
      noStroke();
      translate(x, y);
      fill('white');
      circle(-9, -5, 14);
      circle(9, -5, 14);
      pop();

      push();
      noStroke();
      fill('black');
      translate(x - 9, y - 5);
      circle(googly.eyepos, 0, 9);
      pop();

      push();
      noStroke();
      fill('black');
      translate(x + 9, y - 5);
      circle(googly.eyepos, 0, 9);
      pop();
    }

  }
}

function initializePlayerpos() {
  player.pos.x = 0;
  player.pos.y = height - 100;
  googly.stopped = 50;
  googly.canMove = true;
  InScenes.seeVoid = 400;
  holy.y = 1500;
}