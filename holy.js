/*
Name: Hyunjin.Kim (김현진)
Assignment Name: FINAL PROJECT
Course Number: cs099s20
Term & Year : spring / 2020

*/

class Holy {
  constructor(y) {
    this.x = Camera.x;
    this.y = y;
    this.w = width;
    this.h = 3000;

  }

  update() {
    World.dieTime = constrain(World.dieTime, -10, 30);
    this.y -= 1 + (((World.level - 1) * 0.1));
    this.x = Camera.x;

    if (player.pos.y > this.y + 70) {
      World.dieTime -= 1;
    } else {
      World.dieTime = 50;
    }

    if (World.dieTime < 0) {
      InScenes.nowScene = 'gameOver';
    }
    if (World.dieTime == 0) {
      muteAll();
      Music.value = 1;
      Music.end.play();
      Music.end.setLoop(true);
        }
  }

  show() {

    for (let i = 0; i < 50; i++) {
    push();
    noStroke();
    fill(42, 28, 43, i * 5);
    rect(this.x - this.w * 1.5, this.y + (i * 7), this.w*4, 1000);
    pop();
    }

  }
}