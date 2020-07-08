/*
Name: Hyunjin.Kim (김현진)
Assignment Name: FINAL PROJECT
Course Number: cs099s20
Term & Year : spring / 2020

*/

function UpdateButton() {
  let ease = 0.15;
  let bdy = InScenes.buttonY - InScenes.selectBoxY;

  InScenes.selectBoxY += bdy * ease;
}

function UpdateCamera() {

  let easing = 0.05;
  let dx = (player.pos.x - Camera.x) * easing;
  let dy = (player.pos.y - Camera.y) * easing;

  Camera.x += dx;
  Camera.y += dy;
}

function SeeVoid() {

  let ea = 0.03;
  let ddx = (player.pos.x - Camera.x) * ea;
  let ddy = (holy.y - Camera.y) * ea;

  Camera.x += ddx;
  Camera.y += ddy;

}

function mainMenu() {
  createCanvas(1200, 750);
  background(Img.M);

  UpdateButton();
  mouseButtonCheck();
  mainText();

  push();
  textSize(30);
  fill('white');

  pop();

  push();
  noFill();
  stroke('white');
  strokeWeight(3);
  rect(50, InScenes.selectBoxY, 300, 40);
  pop();

  fadeOut();
}

function mainText() {
  push();
  textSize(25);
  fill('white');
  
  push();
  if(!World.havePlayed) {
    fill('grey');
     } 
  text('Continue', 60, 455);
  pop();
  text('New Game', 60, 525);
  text('Option', 60, 595);
  text('Updates', 60, 665);
  
  pop();
}

function mouseButtonCheck() {
  let xmouseC = mouseX > 50 && mouseX < 350;

  let button1 = mouseY > 425 && mouseY < 465;
  let button2 = mouseY > 495 && mouseY < 535;
  let button3 = mouseY > 565 && mouseY < 605;
  let button4 = mouseY > 635 && mouseY < 675;

  if (xmouseC) {
    if (button1) {
      InScenes.selected = 0;
      InScenes.buttonY = 425;
    }
    if (button2) {
      InScenes.selected = 1;
      InScenes.buttonY = 495;
    }
    if (button3) {
      InScenes.selected = 2;
      InScenes.buttonY = 565;
    }
    if (button4) {
      InScenes.selected = 3;
      InScenes.buttonY = 635;
    }
  }
}

function tutorial_Q() {
  createCanvas(850, 750);
  background(0);

  push();
  textSize(50);
  textAlign(CENTER);
  stroke('white');
  fill('white');
  text('Are you sure to play new Game?', width / 2, height / 2);
  textSize(20);
  text('Enter : Yes / ESC : No', width/2, height * 0.75);
  pop();
}

function fadeOut() {
  InScenes.mainAlpha = constrain(InScenes.mainAlpha, -10, 255);

  push();
  noStroke();
  fill(0, InScenes.mainAlpha);
  rect(-width * 2, -height * 8, width * 4, height * 16);
  pop();
}

function exitGraph() {
  let graphWidth = map(InScenes.exitTime, 0, 150, 0, 600);

  push();
  noStroke();
  translate(Camera.x, Camera.y - 100);
  fill('#636363');
  rect(-300, -25, 600, 50, 30);
  fill('#9c9c9c');
  rect(-300, -25, graphWidth, 50, 30);
  fill('black');
  textAlign(CENTER);
  textSize(35);
  text('Exiting...', 0, 10);
  pop();
}

function GoalLine() {
  push();
  noStroke();
  translate(-width * 4, -World.highplat - 70);
  fill('white');
  rect(0, 55 - 20, width * 8, 20);

  for (let i = 0; i < width * 8; i += 40) {
    beginShape();
    fill('black');
    vertex(i, 35);
    vertex(i + 20, 55);
    vertex(i + 40, 55);
    vertex(i + 20, 35);
    endShape();

  }
  pop();
}

function DrawWhitePortal() {

  for (let i = 0; i < 50; i++) {
    push();
    noStroke();
    fill(255, 255 - i * 5);
    rect(-width * 4, -World.highplat - 2600 + (i * 15), width * 8, 1300);
    pop();
  }

}

function WherePlayer() {
  let playerPositionOnMap = map(player.pos.y, 709.5, -World.highplat, 0, 750);
  playerPositionOnMap = constrain(playerPositionOnMap, 0, 750);
  
  push();
  translate(Camera.x + 359, Camera.y - height/2 - 61);
  strokeWeight(3);
  fill('red');
  beginShape();
  vertex(0, 7); vertex(0, -25); vertex(13, -17); vertex(0, -9);
  endShape();
  pop();
  
  push();
  translate(Camera.x, Camera.y - height/2 - 60);
  fill('gray');
  strokeWeight(2);
  stroke('white');
  rect(-375, 0, 750, 20, 30);
  fill(googly.color);
  rect(-375, 0, playerPositionOnMap, 20, 30);
  pop();
}

function shakingCamera() {
  let rx = map(InScenes.seeVoid, 280, 150, 0, 6);
  let ry = map(InScenes.seeVoid, 280, 150, 0, 6);
  let al = map(InScenes.seeVoid, 300, 150, 0, 255);
  let sx = random(-rx, rx);
  let sy = random(-ry, ry);
  
  translate(sx, sy);
  
  push();
  noStroke();
  fill(42, 28, 43, al);
  ellipse(Camera.x, 2000, InScenes.seeVoid * 5, InScenes.seeVoid * 3);
  pop();
}

function DrawDayLight() {
  push();
  
  
  pop();
}



function gameCanvas(bg) {
  createCanvas(1050, 750);
  background(bg);

}