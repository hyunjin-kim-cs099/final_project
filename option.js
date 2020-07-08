/*
Name: Hyunjin.Kim (김현진)
Assignment Name: FINAL PROJECT
Course Number: cs099s20
Term & Year : spring / 2020

*/

function option() {
  createCanvas(850, 750);
  background(220);

  push();
  textAlign(CENTER);
  textSize(80);
  text('Option', width/2, height * 0.2);
  textSize(20);
  text('ESC to exit', width/2, height * 0.93);
  pop();

  push();
  textSize(50);
  text('BGM: ', 70, height * 0.4);
  text('SFX: ', 70, height * 0.6);
  text('Googly Color: ', 70, height * 0.8);
  pop();

  optionPreview();

}

function makeCPNSL() {
  Slider.colorPicker = createColorPicker(googly.color);
  Slider.colorPicker.size(50, 50);
  
  Slider.BGM = createSlider(0, 100, 70);
  Slider.BGM.size(500, 55);
  Slider.SFX = createSlider(0, 100, 70);
  Slider.SFX.size(500, 55);
  Slider.SFX.mouseReleased(playSFX);
  
}

function playSFX() {
  Sound.jump.play();
}

function optionPreview() {
  googly.color = Slider.colorPicker.color();

  for (let j = 0; j < 2; j++) {
    push();
    noStroke();
    fill(googly.color);
    translate(600 + j * 110, height * 0.765);
    beginShape();
    var xoff = 0;
    for (let i = 0; i < TWO_PI; i += 0.1) {
      let n = map(noise(xoff, yoff), 0, 1, -2.3, 2.3);
      let x = n + 23 * sin(i);
      let y = n + 23 * cos(i);
      vertex(x, y);
      xoff += 0.1;
    }
    endShape(CLOSE);
    yoff += 0.03;
    pop();
  }

  push();
  noStroke();
  translate(600, height * 0.765);
  fill('white');
  circle(-9, -5, 14);
  circle(9, -5, 14);
  pop();

  push();
  noStroke();
  fill('black');
  translate(600 - 9, height * 0.765 - 5);
  circle(-2, 0, 9);
  pop();
  push();
  noStroke();
  fill('black');
  translate(600 + 9, height * 0.765 - 5);
  circle(-2, 0, 9);
  pop();
  
  push();
  translate(710, height * 0.765 -3);
  stroke('black');
  strokeWeight(4);
  strokeJoin(ROUND);
  line(-4, 0, -11, -6);
  line(-4, 0, -11, 6);
  line(4, 0, 11, 6);
  line(4, 0, 11, -6);
  pop();
  
  push();
  fill('gray');
  noStroke();
  rect(540, height * 0.765 + 10, 230, 30, 20);
  pop();
}