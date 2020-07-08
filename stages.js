/*
Name: Hyunjin.Kim (김현진)
Assignment Name: FINAL PROJECT
Course Number: cs099s20
Term & Year : spring / 2020

*/

function Stage() {

  changeBG();
  gameCanvas(World.bgC);

  UpdateCamera();
  translate(width / 2, height / 2);
  translate(-Camera.x, -Camera.y + 100);

  InScenes.mainAlpha -= 4;
  //holy.y = constrain(holy.y, -World.highplat-20, 2000);

  if (InScenes.seeVoid > -100) {
    InScenes.seeVoid -= 1;
  }
  if (InScenes.mainAlpha < 0 && InScenes.seeVoid > -50 && InScenes.seeVoid < 300) {
    SeeVoid();
    translate(-Camera.x, -Camera.y + 400);
  }
  if (InScenes.seeVoid > 150 && InScenes.seeVoid < 270) {
    shakingCamera();
  }
  
  if (World.level % 4 == 0) {
     push();
    fill('#548235');
    noStroke();
    rect(Camera.x - width/2- 50, Camera.y - width, 240, height* 5);
    pop();
     }

  push();
  imageMode(CENTER);
  image(Img.nowBG, Camera.x, Camera.y - 100, 1280, 750);
  pop();
  
  GoalLine();

  player.show();
  if (googly.canMove) {
    player.moving();
  }
  player.update();
  player.getForce(gravity);

  DrawWhitePortal();

  for (let i = 0; i < platforms.length; i++) {
    platforms[i].show();
  }

  if (InScenes.seeVoid < 150) {
    holy.show();
  }
  if (InScenes.seeVoid < 40) {
    holy.update();
  }

  pointer.x = mouseX;
  pointer.y = mouseY;

  fadeOut();

  WherePlayer();

  if ((InScenes.nowScene == 'gameStart' || InScenes.nowScenes == 'tutorial') && keyIsDown(27) && InScenes.seeVoid < 0) {
    exitGraph();
  }
  // console.log(player.vel.y);
}

function changeBG() {
  switch ((World.level % 4)) {
    case 1:
      Img.nowBG = Img.bg1;
      World.bgC = '#946335';
      break;
    case 2:
      Img.nowBG = Img.bg2;
      World.bgC = '#413223';
      break;
    case 3:
      Img.nowBG = Img.bg3;
      World.bgC = '#929292';
      break;
    case 0:
      Img.nowBG = Img.bg4;
      World.bgC = '#a5ce89';
      break;
  }
}

function Floating() {
  let Rgravity = createVector(0, -0.05);

  googly.canMove = false;
  googly.stopped -= 1;

  if (googly.stopped < 0) {
    player.getForce(Rgravity);
  } else {
    player.vel.mult(0);
  }

  if (player.pos.y < -World.highplat - 100 && abs(player.vel.y) > 2) {
    googly.eye = '><';
  }

  if (player.pos.y < -World.highplat - 1200) {
    player.vel.mult(0);
    Music.value += 1;
    InScenes.nowScene = 'nextStage';
  }

}

function nextStage() {
  createCanvas(1050, 750);
  background(255);

  push();
  fill('black');
  textAlign(CENTER);
  textSize(50);
  text('Clear!', width / 2, height / 2);
  pop();
}

function initializeGame() {
  clearMap();
  createMap();
  checkHighest();
  initializePlayerpos();
}

function gameOver() {
  createCanvas(1050, 750);
  background(0);
  InScenes.over -= 1;
  InScenes.over = constrain(InScenes.over, -10, 80);

  push();
  fill('#661717');
  textAlign(CENTER);
  textSize(50);
  text('YOU DIED', width / 2, height / 2);
  pop();
}