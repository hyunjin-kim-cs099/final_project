/*
Name: Hyunjin.Kim (김현진)
Assignment Name: FINAL PROJECT
Course Number: cs099s20
Term & Year : spring / 2020

*/

function whatsNew() {
  createCanvas(850, 750);
  background(220);

  push();
  textAlign(CENTER);
  fill(255, 100);
  rect(width * 0.15, height * 0.15, width * 0.7, height * 0.7);
  fill('black');
  textSize(40);
  text('Updates', width / 2, height * 0.3);
  textSize(30);
  text('Flash >> changed to roll.\nAdded stump. You can bounce!\nNow you can change the Googly color!\n\nWant to know more\n>> see the ReadMe.txt file.', width/2, height/2);
  pop();
}