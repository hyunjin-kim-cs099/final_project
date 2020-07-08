/*
Name: Hyunjin.Kim (김현진)
Assignment Name: FINAL PROJECT
Course Number: cs099s20
Term & Year : spring / 2020

*/

class Box {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h * 0.55;
  }

  show() {
    switch ((World.level % 4)) {
      case 1:
        this.grassTerrain();
        break;
      case 2:
        this.crateTerrain();
        break;
      case 3:
        this.stoneTerrain();
        break;
      case 0:
        this.woodTerrain();
        break;
    }
  }

  grassTerrain() {
    push();
    noStroke();
    fill('#4e9c3b');
    rect(this.x, this.y, this.w, 13.75, 5, 5, 0, 0);

    fill('#946335');

    beginShape();
    vertex(this.x, this.y + 12.75);
    for (let i = 5; i <= this.w - 5; i += 15) {
      vertex(this.x + i, this.y + 5 + 13.75 / 2 + 30 * sin(i / this.w * PI) + underplatY[i] * 1.5);
    }
    vertex(this.x + this.w, this.y + 12.75);
    endShape(CLOSE);

    //rect(this.x, this.y, this.w, this.h - 15);
    pop();
  }

  crateTerrain() {

    for (let i = 0; i < this.w; i += 60) {
      push();
      noStroke();
      rectMode(CORNER);
      translate(this.x + i, this.y);
      fill('#ab9c78');
      square(0, 0, 60);
      fill('#82724a');
      square(10, 10, 40);
      fill('#ab9c78');
      rectMode(CENTER);
      translate(30, 30);
      rotate(PI / 4);
      rect(0, 0, 70, 10);
      rotate(PI / 2);
      rect(0, 0, 70, 10);
      pop();
    }

  }

  stoneTerrain() {
    push();
    noStroke();
    fill('#8a8781');
    rect(this.x, this.y, this.w, 13.75, 5, 5, 0, 0);

    beginShape();
    vertex(this.x, this.y + 12.75);
    for (let i = 5; i <= this.w - 5; i += 15) {
      vertex(this.x + i, this.y + 5 + 13.75 / 2 + 40 * sin(i / this.w * PI) + underplatY[i] * 1.5);
    }
    vertex(this.x + this.w, this.y + 12.75);
    endShape(CLOSE);
    //rect(this.x, this.y, this.w, this.h - 15);
    pop();
  }

  woodTerrain() {
    for (let i = 0; i < this.w; i += 60) {
      push();
      noStroke();
      translate(this.x + i, this.y);
      ellipseMode(CORNER);
      fill('#47341a');
      circle(0, 0, 60);
      fill('#b59467');
      circle(4, 4, 52);
      pop();
    }

  }

}



function createMap() {
  let NofPlatforms = 30 + (World.level * 5);

  platforms.push(new Box(-width * 3, height - 30, width * 6, 600));


  for (let i = -1; i < NofPlatforms; i++) {
    platform = new Box(random(-width, width), random(-2000 - (World.level * 800), height - 100), floor(random(2, 5)) * 60, 25);
    var overlapping = false;
    for (let j = 0; j < platforms.length; j++) {
      var other = platforms[j];
      let xcheck = abs(platform.x - other.x) < platform.w;
      let ycheck = abs(platform.y - other.y) < 100;
      if (xcheck && ycheck) {
        overlapping = true;
        break;
      }
    }
    if (!overlapping) {
      platforms.push(platform);
    }
  }


}

function clearMap() {
  platforms.splice(0, platforms.length);
  highestBox.splice(0, highestBox.length);
}

function checkHighest() {
  for (let i = 0; i < platforms.length; i++) {
    highestBox.push(abs(platforms[i].y));
  }

  World.highplat = max(highestBox);

}