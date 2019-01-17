/*
Title: Multiplayer Fishing Game
Imagined, Designed, and Programmed by: Ari Dev Rangarajan
Date: January 17, 2019
Description: This is a game where two players compete to catch fish as fast as possible at the same time.
Each player must press a random key that will appear out of 4 possibilities once they hook their fish within a certain amount of time
to catch it and bring it to the surface to get their points. First to 10 wins!

This program does not include external sources of ideas and inspiration

Code from external sources:
Even listener code from line 350 to the end of the code written to stop the screen from scrolling when the arrow keys are pressed was received from Ryan Collier.

*/




//Declare all variables. Create two arrays, one for the catch keys for player one, and one for the catch keys for player two.
let fish= [];
let rightLetters = ["H","J","K","L"];
let leftNumbers = ["1","2","3","4"];
let right;
let left;
let rightPoints=0;
let leftPoints=0;
let gameStart=false
let timeLimit=Infinity;
let scoreLimit=10;
let gameEnd=false




function setup() {
  	createCanvas(windowWidth, windowHeight);
    right = new Hook(1000,windowHeight/2,false);
    left = new Hook(500,windowHeight/2,false);
}
//Make three if statements so that the game ends when the time limit or score limit is reached (both are set above)
function draw(){
	background(66, 149, 244);
  fill(255);
  noStroke();
  rect(0,0,windowWidth,200);
  if(timeLimit<=frameCount/frameRate){
    gameEnd=true;
  }
  if(rightPoints>=scoreLimit){
    gameEnd=true;
  }
  if(leftPoints>=scoreLimit){
    gameEnd=true;
  }
//If the game hasn't started or ended yet, this situation displays the instructions. These are the first things that appear when the game is opened
  if(gameStart==false&&gameEnd==false){
    fill(76, 186, 109);
    rect(150,150,1500,700);
    textSize(60);
    fill(0);
    text("Welcome to a multiplayer fishing game!",400,250);
    textSize(30);
    text("Player 1: Use S,Z,X,C to move and try to catch a fish. When you hook a fish,a random key of 1,2,3,4 will pop up on the screen and it wil be your job to try to press the appropriate key in time. If you press the right key in time, the fish will be hooked and you can bring it to the surface to get your points.", 200,300,1300,900);
    text("Player 2: Use the arrow keys to move and try to catch a fish. When you hook a fish,a random key of H,J,K,L will pop up on the screen and it wil be your job to try to press the appropriate key in time. If you press the right key in time, the fish will be hooked and you can bring it to the surface to get your points.", 200,475,1300,900);
    text("The game is until 10 points", 200,650,1300,900);
    fill(255,255,255,0);
    stroke(0)
    rect(1400,790,80,50);
    noStroke();
    fill(0);
    text("Play", 1410,825);
  }else if(gameEnd==false){
//Draw all of the fish and the hooks, create a new fish if it has been 100 frames, and display all of the points for each player
  right.drawHook();
  right.moveRightHook();
  left.drawHook();
  left.moveLeftHook();

  for (let i = 0; i < fish.length; i++) {
	 	fish[i].drawFish();
      fish[i].moveFish();
       fish[i].catchFish();
        fish[i].reelFish();
	  }
  if(frameCount%100==0){
    let  b = new Fish(0,random(400,windowHeight),random(4,10),false,false,false,false);
    fish.push(b);
    console.log(fish);
  }
  textSize(30);
  text("Player 2 Points: "+rightPoints,1500,100);
  text("Player 1 Points: "+leftPoints,100,100);
  }else{
//If the game has Ended (because the time or score limit if statments above have become true) the computer decides who has won, or whether it is a tie.
//It then displays this information on the screen.
  if(leftPoints>rightPoints){
    fill(76, 186, 109);
    rect(150,150,1500,700);
    textSize(200);
    fill(0);
    text("Player 1 Wins!",300,425);
  }else if (rightPoints>leftPoints) {
    fill(76, 186, 109);
    rect(150,150,1500,700);
    textSize(200);
    fill(0);
    text("Player 2 Wins!",300,425);
  }else {
    fill(76, 186, 109);
    rect(150,150,1500,700);
    textSize(200);
    fill(0);
    text("It's a Tie",300,425);
  }
  }
}

//Create a class Fish and give it a location, a speed, and boolean true/false variables that tell if it has been hooked or caught by either hook.
//This prevents players from stealing fish from each other and allows the fish to be later brought up towards the surface. The variables this.originalSpeed
//this.random letter, this. randomNumber and this.start timer are all variables that will be explained when they are used later on.
class Fish{
  constructor(x,y,speed,rHooked,lHooked,rCaught,lCaught){
    this.y=y;
      this.x=x;
        this.speed=speed;
          this.rHooked=rHooked;
            this.lHooked=lHooked;
              this.rCaught=rCaught;
                this.lCaught=lCaught;
                  this.originalSpeed=speed;
                    this.randomLetter;
                      this.randomNumber;
                        this.startTimer=0;
  }
  drawFish(){
    noStroke();
    fill(	250,128,114);
    ellipse(this.x-75,this.y,150,50);
    triangle(this.x-125,this.y,this.x-175,this.y-25,this.x-175,this.y+25);
    triangle(this.x-70,this.y-20,this.x-100,this.y-40,this.x-130,this.y-10);
    triangle(this.x-110,this.y+20,this.x-130,this.y+40,this.x-150,this.y+5);
    fill(255);
    ellipse(this.x-20,this.y,20,20)
    fill(0);
    ellipse(this.x-20,this.y,10,10);
  }
  moveFish(){
    this.x=this.x+this.speed
  }
//If the hook fits inside a boundary set by the fish's location, it is now hooked. The if statement also checks to see if there is another fish on that hook, because only one can be on at a time.
// If this is the first time this loop has run through this fish in this hooking scenario the timer starts, which means that the person only
// has a certain amount of frames before the fish moves on. This is why originalSpeed is neccesary, so that the fish can move
//on at the same pace. The reason theat there needed to be an or in the statement that allows it to be true if the fish is hooked is that otherwise, the computer
//would not allow the fish to be on the hook because it would think that there already is a fish on it. After that, the code makes a random number/letter pop up
//out of the arrays set at the top and if it is pressed in time, the fish is deemed caught. Otherwise, it moves on. There are two if statements because I had to account for both
//the right and left hook.
  catchFish(){
    stroke(0);
    if (this.x<=right.x+25&&this.x>=right.x&&this.y<=right.y+125&&this.y>=right.y+75&&right.on==false&&this.startTimer<=frameCount-100||this.rHooked==true){
      if (this.rHooked==false){
        this.startTimer=frameCount;
        this.randomLetter=random(rightLetters);
      }
      this.rHooked=true;
      right.on=true;
      this.speed=0;
      textSize(30);
      fill(255);
      rect(this.x+30,this.y-25,50,50);
      text(this.randomLetter,this.x+55,this.y)
      console.log(letterToKeyCode(this.randomLetter))
      if(frameCount-this.startTimer<=50){
        if (keyIsDown(letterToKeyCode(this.randomLetter))){
        this.rCaught=true;
        this.rHooked=false;
      }
      }else{
      this.rHooked=false;
      right.on=false;
      this.speed=this.originalSpeed;
      }
    }
    if (this.x<=left.x+25&&this.x>=left.x&&this.y<=left.y+125&&this.y>=left.y+75&&left.on==false&&this.startTimer<=frameCount-100||this.lHooked==true){
      if (this.lHooked==false){
        this.startTimer=frameCount;
        this.randomNumber=random(leftNumbers);
      }
      this.lHooked=true;
      left.on=true;
      this.speed=0;
      textSize(30);
      fill(255);
      rect(this.x+30,this.y-25,50,50);
      text(this.randomNumber,this.x+55,this.y)
      console.log(letterToKeyCode(this.randomNumber))
      if(frameCount-this.startTimer<=50){
        if (keyIsDown(letterToKeyCode(this.randomNumber))){
        this.lCaught=true;
        this.lHooked=false;
      }
      }else{
      this.lHooked=false;
      left.on=false;
      this.speed=this.originalSpeed;
      }
    }
  }
  //Finally, reelFish makes the fish follow the hook towards the surface. Once it reaches the surface, it moves it out of the screen and gives the
  //corresponding side a point.
  reelFish(){
    if(this.rCaught==true){
      this.x=right.x;
      this.y=right.y+100;
    }
    if(this.lCaught==true){
      this.x=left.x;
      this.y=left.y+100;
    }
    if(this.rCaught==true&&right.y<=110){
      this.x=3000;
      this.rCaught=false;
      rightPoints=rightPoints+1;
      right.on=false;
    }
    if(this.lCaught==true&&left.y<=110){
      this.x=3000;
      this.lCaught=false;
      leftPoints=leftPoints+1;
      left.on=false;
    }
  }
}

//Create a class hook with a location and a boolean that says whether it has a fish on it or not.
class Hook {

	constructor(x,y,on){
    		this.y = y;
          this.x = x;
           this.on = on;
	}

	drawHook(){
    stroke("black");
    strokeWeight(1);
    noFill();
    stroke(0);
    line(this.x,100,this.x,this.y);
    line(this.x,this.y,this.x,this.y+50);
    noFill();
    arc(this.x,this.y+75,50,50,-HALF_PI,HALF_PI);

  }
//create two ways to move, one with the right hook and the arrow keys, and the other with SZXC. Each movement if statement has built in barriers to prevent
//the fish from moving out of the screen.
	moveRightHook(){
    if (keyIsDown(UP_ARROW)) {
      if(this.y<=100){
        this.y==100;
      }else{
        this.y = this.y-4;
      }
    }

    if (keyIsDown(DOWN_ARROW)) {
        if(this.y+100>=windowHeight){
          this.y+100==windowHeight;
        }else{
          this.y = this.y+4;
        }
    }
    if (keyIsDown(LEFT_ARROW)) {
       if(this.x<=25){
         this.x=25;
       }else{
         this.x = this.x-4;
       }
     }

    if (keyIsDown(RIGHT_ARROW)) {
      if(this.x>=windowWidth-75){
        this.x=windowWidth-75;
      }else{
        this.x = this.x+4;
      }
  }
}

  moveLeftHook(){
    if (keyIsDown(83)) {
      if(this.y<=100){
        this.y==100;
      }else{
        this.y = this.y-4;
      }
    }

    if (keyIsDown(88)) {
        if(this.y+100>=windowHeight){
          this.y+100==windowHeight;
        }else{
          this.y = this.y+4;
        }
    }
    if (keyIsDown(90)) {
       if(this.x<=25){
         this.x=25;
       }else{
         this.x = this.x-4;
       }
     }

    if (keyIsDown(67)) {
      if(this.x>=windowWidth-75){
        this.x=windowWidth-75;
      }else{
        this.x = this.x+4;
      }
  }
}
}
//Create a function that turns letters and numbers from the arrays at the top into key codes that the computer can understand and check to see if
//they have been pressed or not.
function letterToKeyCode(letter){
  if (letter=="H"){
    return 72;
  }else if (letter=="J") {
    return 74;
  }else if (letter=="K") {
    return 75;
  }else if (letter=="L") {
    return 76;
  }else if (letter=="1"){
    return 49;
  }else if (letter=="2") {
    return 50;
  }else if(letter =="3") {
    return 51;
  }else if (letter=="4") {
    return 52;
  }
  }
  //create the button for the start screen that starts the game.
function mouseClicked(){
  if(gameStart==false&&mouseX>=1400&&mouseX<=1480&&mouseY>=790&&mouseY<=840){
    gameStart=true
    }
  }
//a little piece of code that stops the screen from scrolling when the arrow keys are used because they are neccesary for the game.
window.addEventListener("keydown", function(e) {

    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
