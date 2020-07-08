/*
Name: Hyunjin.Kim (김현진)
Assignment Name: FINAL PROJECT
Course Number: cs099s20
Term & Year : spring / 2020

*/

var Img = {
  M: null,
  nowBG: null,
  bg1: null,
  bg2: null,
  bg3: null,
  bg4: null
}

var Music = {
  vol: 0.7,
  value: 1,

  main: null,
  clear: null,
  end: null,
  st1: null,
  st2: null,
  st3: null,
  st4: null

}

var Sound = {
  vol: 0.7,

  jump: null,
  die: null,
  bounce: null,
}

function preload() {
  soundFormats('mp3', 'wav', 'ogg');

  Img.M = loadImage('assets/main2.png');
  Img.bg1 = loadImage('assets/back1.PNG');
  Img.bg2 = loadImage('assets/back2.PNG');
  Img.bg3 = loadImage('assets/back3.PNG');
  Img.bg4 = loadImage('assets/back4.PNG');

  Music.main = loadSound('assets/music/mainbgm.mp3');
  Music.end = loadSound('assets/music/end.mp3');
  Music.st1 = loadSound('assets/music/st1.mp3');
  Music.st2 = loadSound('assets/music/st2.mp3');
  Music.st3 = loadSound('assets/music/st3.mp3');
  Music.st4 = loadSound('assets/music/st4.mp3');


  Sound.jump = loadSound('assets/sounds/jump.wav');
  Sound.bounce = loadSound('assets/sounds/bounce.wav');
}

function muteAll() {
  Music.st1.stop();
  Music.st2.stop();
  Music.st3.stop();
  Music.st4.stop();
}

function SetVolume() {
  Music.main.setVolume(Music.vol);
  Music.end.setVolume(Music.vol);
  Music.st1.setVolume(Music.vol);
  Music.st2.setVolume(Music.vol);
  Music.st3.setVolume(Music.vol);
  Music.st4.setVolume(Music.vol);

  Sound.jump.setVolume(Sound.vol);
  Sound.bounce.setVolume(Sound.vol);
}

function adjustVolume() {
  let MVol = map(Slider.BGM.value(), 0, 100, 0, 0.57);
  let SVol = map(Slider.SFX.value(), 0, 100, 0, 0.57);

  Slider.colorPicker.position(windowWidth * 0.505, height * 0.7495);
  Slider.BGM.position(windowWidth * 0.385, height * 0.34);
  Slider.SFX.position(windowWidth * 0.385, height * 0.542);

  Music.vol = MVol;
  Sound.vol = SVol;

  SetVolume();
}

function playMusic() {
  switch ((Music.value % 4)) {
    case 1:
      Music.st1.setLoop(true);
      Music.st1.play();
      break;
    case 2:

      Music.st2.setLoop(true);
      Music.st2.play();
      break;
    case 3:
      Music.st3.setLoop(true);
      Music.st3.play();
      break;
    case 0:

      Music.st4.setLoop(true);
      Music.st4.play();
      break;
  }
}