//create an empty array called balls
let fish= [];
let right;
let left;
let bounceRight;
let bounceLeft;
let scored;






function setup() {
  	createCanvas(windowWidth, windowHeight);
    right = new Hook(1000,windowHeight/2);
    left = new Hook(500,windowHeight/2);
}

function draw(){
	background(66, 149, 244);
  fill(255);
  rect(0,0,windowWidth,200);

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
    let  b = new Fish(0,random(400,windowHeight),random(4,10),false,false);
    fish.push(b);
    console.log(fish); //print the balls array to the console
  }
}


class Fish{
  constructor(x,y,speed,rCaught,lCaught){
    this.y=y;
      this.x=x;
        this.speed=speed;
          this.rCaught=rCaught;
            this.lCaught=lCaught;
  }
  drawFish(){
    fill(255,0,0);
    ellipse(this.x-50,this.y,100,50);
  }
  moveFish(){
    this.x=this.x+this.speed
  }
  catchFish(){
    if (this.x<=right.x+25&&this.x>=right.x&&this.y<=right.y+125&&this.y>=right.y+75){
      this.speed=0;
      textSize(30);
      text("It's on!",1500,100);
        if(keyIsDown(76)){
          this.rCaught=true;
        }
    }
    if (this.x<=left.x+25&&this.x>=left.x&&this.y<=left.y+125&&this.y>=left.y+75){
      this.speed=0;
      textSize(30);
      text("It's on!",400,100);
      if(keyIsDown(49)){
        this.lCaught=true;
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
  }
}


class Hook {

	constructor(x,y){ //every avatar needs an x value, a y value, and a speed
    		this.y = y;
          this.x = x;
	}

	drawHook(){  // draw the running person
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
    if (keyIsDown(UP_ARROW)) { //if you hold the up arrow, move up by speed
      if(this.y<=100){
        this.y==100;
      }else{
        this.y = this.y-4;
      }
    }

    if (keyIsDown(DOWN_ARROW)) { // if you hold the down arrow, move down by speed
        if(this.y+100>=windowHeight){
          this.y+100==windowHeight;
        }else{
          this.y = this.y+4;
        }
    }
    if (keyIsDown(LEFT_ARROW)) { //if you hold the up arrow, move up by speed
       if(this.x<=25){
         this.x=25;
       }else{
         this.x = this.x-4;
       }
     }

    if (keyIsDown(RIGHT_ARROW)) { // if you hold the down arrow, move down by speed
      if(this.x>=windowWidth-75){
        this.x=windowWidth-75;
      }else{
        this.x = this.x+4;
      }
  }
}

  moveLeftHook(){
    if (keyIsDown(87)) { //if you hold the up arrow, move up by speed
      if(this.y<=100){
        this.y==100;
      }else{
        this.y = this.y-4;
      }
    }

    if (keyIsDown(83)) { // if you hold the down arrow, move down by speed
        if(this.y+100>=windowHeight){
          this.y+100==windowHeight;
        }else{
          this.y = this.y+4;
        }
    }
    if (keyIsDown(65)) { //if you hold the up arrow, move up by speed
       if(this.x<=25){
         this.x=25;
       }else{
         this.x = this.x-4;
       }
     }

    if (keyIsDown(68)) { // if you hold the down arrow, move down by speed
      if(this.x>=windowWidth-75){
        this.x=windowWidth-75;
      }else{
        this.x = this.x+4;
      }
  }
}
}

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
