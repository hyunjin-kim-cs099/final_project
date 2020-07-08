/*
Name: Hyunjin.Kim (김현진)
Assignment Name: FINAL PROJECT
Course Number: cs099s20
Term & Year : spring / 2020

*/

let pointer;

let World = {
  highplat: 0,
  stage: 0,
  level: 1,
  havePlayed: false,
  dieTime: 50,
  bgC: 0,
}

let InScenes = {
  nowScene: 'mainMenu',
  selected: 1,
  selectBoxY: 495,
  buttonY: 495,
  mainAlpha: 0,
  exitTime: 150,
  seeVoid: 400,
  over: 80,
}

let googly = {
  JumpCount: 2,
  dodged: false,
  IsStumping: false,
  canMove: true,
  state: 'air',
  lookat: 'for',
  eye: 'oo',
  eyepos: 0,
  stopped: 50,
  color: 'skyblue',
}

var Slider = {
  ColorPicker: null,
  BGM: null,
  SFX: null
}

let Camera = {
  x: 0,
  y: 0,
  Void: 1500,
}

let gravity;

let platforms = [];
let googlypos = [];
let underplatY = [];
let highestBox = [];

let yoff = 0;

function setup() {
  createCanvas(900, 800)
  //alert('Recommended In FullScreen');
  makeCPNSL();
  userStartAudio();

  Music.main.play();
  Music.main.setVolume(Slider.BGM.value() / 100);
  Music.main.setLoop(true);

  player = new Player(0, height - 100);
  holy = new Holy(1500);

  for (let i = 0; i < 250; i += 0.5) {
    underplatY.push(noise(i) * 50);
  }

  gravity = createVector(0, 0.2);
  pointer = createVector();

  Camera.x = player.pos.x;
  Camera.y = player.pos.y;

}

function draw() {
  background(220);
  adjustVolume();

  if (InScenes.nowScene == 'mainMenu') {
    mainMenu();
    if (InScenes.mainAlpha > 0) {
      InScenes.mainAlpha -= 4.5;
    }
  }
  if (InScenes.nowScene == 'option') {
    option();
  }
  if (InScenes.nowScene == 'whatsNew') {
    whatsNew();
  }
  if (InScenes.nowScene == 'gameStart') {
    Stage();
  }
  if (InScenes.nowScene == 'tutorial') {
    tutorial();
  }
  if (InScenes.nowScene == 'tutorial?') {
    mainMenu();
    InScenes.mainAlpha += 3.5;
    if (InScenes.mainAlpha > 255) {
      tutorial_Q();
    }
  }
  if (InScenes.nowScene == 'win') {
    Stage();
    Floating();
  }
  if (InScenes.nowScene == 'gameOver') {
    InScenes.mainAlpha = 255;
    gameOver();
  }
  if (InScenes.nowScene == 'nextStage') {
    nextStage();
  }
  if (InScenes.nowScene != 'option') {
    Slider.colorPicker.hide();
    Slider.BGM.hide();
    Slider.SFX.hide();
  }

  console.log(Music.value);

}


function keyPressed() {

  if ((InScenes.nowScene == 'gameStart' || InScenes.nowScene == 'tutorial') && googly.canMove == true) {
    if ((googly.state == 'ground' || googly.JumpCount > 0) && keyCode == 32) {
      Sound.jump.play();
      googly.JumpCount -= 1;
      googly.state = 'air';
      var aa = createVector(0, -5);
      player.getForce(aa);
      //console.log('jump');
    }

    if (googly.IsStumping == false && keyCode == 32 && keyIsDown(83)) {
      var stump = createVector(0, 15);
      player.getForce(stump);
      googly.IsStumping = true;
      //console.log(0);
    }

    if (keyCode == 16) {
      if (googly.dodged == false && googly.lookat == 'left') {
        var Ldodge = createVector(-3.5, -0.5);
        player.getForce(Ldodge);
        player.vel.mult(0);
        googly.dodged = true;
      }
      if (googly.dodged == false && googly.lookat == 'right') {
        var Rdodge = createVector(3.5, -0.5);
        player.getForce(Rdodge);
        player.vel.mult(0);
        googly.dodged = true;
      }
    }
  }

  if (InScenes.nowScene == 'mainMenu') {
    if (InScenes.selected < 3 && keyCode == 83) {
      InScenes.selected += 1;
      InScenes.buttonY += 70;
    }
    if (InScenes.selected > 0 && keyCode == 87) {
      InScenes.selected -= 1;
      InScenes.buttonY -= 70;
    }

    if (InScenes.selected == 0 && World.havePlayed == true && keyCode == 32) {
      Music.main.stop();
      muteAll();
      playMusic();
      InScenes.nowScene = 'gameStart';
    }
    if (InScenes.selected == 1 && keyCode == 32) {
      Music.main.stop();
      World.level = 1;
      Music.value = 1;
      initializeGame();
      InScenes.nowScene = 'tutorial?';
    }
    if (InScenes.selected == 2 && keyCode == 32) {
      //makeCPNSL();
      Slider.colorPicker.show();
      Slider.BGM.show();
      Slider.SFX.show();
      InScenes.nowScene = 'option';
    }
    if (InScenes.selected == 3 && keyCode == 32) {
      InScenes.nowScene = 'whatsNew';
    }
  }

  if (InScenes.nowScene == 'nextStage' && keyCode == 32) {
    muteAll();
    playMusic();
    World.level += 1;
    initializeGame();
    InScenes.nowScene = 'gameStart';
  }

  if (InScenes.nowScene == 'gameOver' && keyCode == 32 && InScenes.over < 0) {
    InScenes.over = 80;
    World.havePlayed = false;
    Music.end.stop();
    Music.main.play();
    initializeGame();
    InScenes.nowScene = 'mainMenu';
  }

  if (InScenes.nowScene == 'tutorial?' && (keyCode == 8 || keyCode == 27)) {
    Music.main.play();
    initializeGame();
    InScenes.nowScene = 'mainMenu';
  }
  if (InScenes.nowScene == 'tutorial?' && keyCode == 13) {
    initializeGame();
    muteAll();
    playMusic();
    InScenes.nowScene = 'gameStart';
  }

  if ((InScenes.nowScene == 'whatsNew' || InScenes.nowScene == 'option') && keyCode == 27) {
    InScenes.nowScene = 'mainMenu';
  }

}

function keyReleased() {
  if (keyCode == 27) {
    InScenes.exitTime = 150;
  }
}

function mousePressed() {
  let xmouseC = mouseX > 50 && mouseX < 350;

  let button1 = mouseY > 425 && mouseY < 465;
  let button2 = mouseY > 495 && mouseY < 535;
  let button3 = mouseY > 565 && mouseY < 605;
  let button4 = mouseY > 635 && mouseY < 675;

  if (InScenes.nowScene == 'mainMenu' && xmouseC) {
    if (button1 && World.havePlayed == true) {
      Music.main.stop();
      InScenes.nowScene = 'gameStart';
    }
    if (button2) {
      Music.main.stop();
      World.level = 1;
      Music.value = 1;
      InScenes.nowScene = 'tutorial?';
    }
    if (button3) {
      Slider.colorPicker.show();
      Slider.BGM.show();
      Slider.SFX.show();
      InScenes.nowScene = 'option';
    }
    if (button4) {
      InScenes.nowScene = 'whatsNew';
    }
  }
}