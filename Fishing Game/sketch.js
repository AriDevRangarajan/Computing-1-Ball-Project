let fish= [];
let rightLetters = ["H","J","K","L"];
let leftNumbers = ["1","2","3","4"];
let right;
let left;
let bounceRight;
let bounceLeft;
let scored;
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

  if(gameStart==false&&gameEnd==false){
    fill(76, 186, 109);
    rect(150,150,1500,700);
    textSize(60);
    fill(0);
    text("Welcome to a multiplayer fishing game!",400,250);
    textSize(30);
    text("Player 1: Use S,Z,X,C to move and try to catch a fish. When you hook a fish,a random key of 1,2,3,4 will pop up on the screen and it wil be your job to try to press the appropriate key in time. If you press the right key in time, the fish will be hooked and you can bring it to the surface to get your points. Faster fish give you more points.", 200,300,1300,900);
    text("Player 2: Use the arrow keys to move and try to catch a fish. When you hook a fish,a random key of H,J,K,L will pop up on the screen and it wil be your job to try to press the appropriate key in time. If you press the right key in time, the fish will be hooked and you can bring it to the surface to get your points. Faster fish give you more points.", 200,475,1300,900);
    text("The game is until 10 points", 200,650,1300,900);
    fill(255,255,255,0);
    stroke(0)
    rect(1400,790,80,50);
    noStroke();
    fill(0);
    text("Play", 1410,825);
  }else if(gameEnd==false){

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
function mouseClicked(){
  if(gameStart==false&&mouseX>=1400&&mouseX<=1480&&mouseY>=790&&mouseY<=840){
    gameStart=true
    }
  }

window.addEventListener("keydown", function(e) {

    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
