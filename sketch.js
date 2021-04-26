var dw, dh;
var wallGroup,w1, w2,w3,w4,w5,w6,w7,w8,w9,w10,w11;
var thief, cop1, cop2;
var edges;
var diamond,d2,d3, gemGroup, emerald, emImg;
var score=0;
var laser, l2;
var music;
var exit;
var gameState="play";
var t=300;
function preload(){
  thiefImg=loadImage("Images/Thief.png");
  cop1Img=loadImage("Images/Cop.png");
  cop2Img=loadImage("Images/Cop.png");
  diamondImg=loadImage("Images/Diamond.png");
  emImg=loadImage("Images/Emerald.png");
  music=loadSound("Images/HeistMusic.mp3");
}
function setup(){
  dw=displayWidth;
  dh=displayHeight;
  createCanvas(dw-20, dh-40);
  thief=createSprite(dw/2-630,dh/2-360,10,10);
  thief.addImage("thief", thiefImg);
  thief.scale=.08;
  cop1=createSprite(dw-80, dh/2+240,10,10);
  cop1.addImage("cop", cop1Img);
  cop1.scale=.03;
  cop2=createSprite(dw-80, dh/2-185,10,10);
  cop2.addImage("cop", cop2Img);
  cop2.scale=.03;
  cop1.velocityX=-4;
  cop2.velocityX=-4;
  diamond=createSprite(dw/2-645,dh/2-220,10,10);
  diamond.addImage("gem", diamondImg);
  diamond.scale=.1;
  d2=createSprite(dw/2, dh-200, 10,10)
  d2.addImage("gem", diamondImg);
  d2.scale=.1;
  d3=createSprite(dw/2,dh/2-200,10,10);
  d3.addImage("gem", diamondImg);
  d3.scale=.1;
  emerald=createSprite(dw-100,dh/2+35,10,10);
  emerald.addImage("emerald", emImg);
  emerald.scale=.1;
  w1=createSprite(dw/2-570,dh/2-156,dw/75,dh/3);
  w2=createSprite(dw/2-645,dh/2-300,dw/10,dh/75);
  w3=createSprite(dw/2-290,dh/2-394,dw/75,dh/3);
  w4=createSprite(dw/2-10,dh/2-250,dw/3+70,dh/75);
  w5=createSprite(dw/2-10,dh/2-130,dw/3+70,dh/75);
  w6=createSprite(dw/2-10,dh/2+300,dw/3+70,dh/75);
  w7=createSprite(dw/2-10,dh/2+180,dw/3+70,dh/75);
  w8=createSprite(dw/2-290,dh/2+444,dw/75,dh/3);
  w9=createSprite(dw-110,dh/2-50, dw/8, dh/75);
  w10=createSprite(dw-193,dh/2+34,dw/100,dh/5);
  w11=createSprite(dw-110,dh/2+130, dw/8, dh/75);
  laser=createSprite(dw/2-652,dh/2-100,dw/10,dh/75)
  laser.shapeColor="red";
  l2=createSprite(dw/2-10,dh/2+150,dw/3+70,dh/75);
  l2.shapeColor="red";
  exit=createSprite(dw/2, dh/2-440,130,25);
  wallGroup = new Group();
  gemGroup= new Group();
  gemGroup.add(diamond,d2,d3);
  wallGroup.add(w1);
  wallGroup.add(w2);
  wallGroup.add(w3);
  wallGroup.add(w4);
  wallGroup.add(w5);
  wallGroup.add(w6);
  wallGroup.add(w7);
  wallGroup.add(w8);
  wallGroup.add(w9);
  wallGroup.add(w11);
  thief.debug=false;
  thief.setCollider("rectangle", 0,0,700, thief.height-20);
  music.play();
  timeOut();
}

function draw(){
  background("black");
  move();
  copMovement();
  points();
  caught();
  wallDisappear();
  edges=createEdgeSprites();
  cop1.bounceOff(edges);
  cop2.bounceOff(edges);
  thief.bounceOff(edges);
  thief.bounceOff(wallGroup);
  laser.bounceOff(w2);
  laser.bounceOff(edges);
  l2.bounceOff(w7);
  l2.bounceOff(w5);
  fill("white");
  text("Score:" + score, dw-150, dh/2-400);
  fill("red");
  textSize(20);
  text("Exit", dw/2, dh/2-410);
  win();

  
  if(gameState==="end"){
    fill("red");
    textSize(40);
    text("Game Over. You finished with " + score +" dollars", dw/2-350, dh/2);
    cop1.velocityX=0;
    cop2.velocityX=0;
    laser.velocityY=0;

  }





  drawSprites();

}

function move(){
  if(keyDown("UP_ARROW") && gameState==="play"){
    thief.y=thief.y-5;
  }
  if(keyDown("DOWN_ARROW")&& gameState==="play"){
    thief.y=thief.y+5;
  }
  if(keyDown("RIGHT")&& gameState==="play"){
    thief.x=thief.x+5;
  }
  if(keyDown("LEFT")&& gameState==="play"){
    thief.x=thief.x-5;
  }
}

function copMovement(){
  if(cop2.isTouching(w1))
  cop2.bounceOff(w1);
  if(cop1.isTouching(w1))
  cop1.bounceOff(w1);
}
function timeOut(){
  laser.velocityY=-2;
  l2.velocityY=-2.5;
}

function points(){
  if(thief.isTouching(diamond)){
    score=score+50;
    diamond.destroy();
  }
  if(thief.isTouching(d2)){
    score=score+50;
    d2.destroy();
  }
  if(thief.isTouching(d3)){
    score=score+50;
    d3.destroy();
  }

  if(thief.isTouching(emerald)){
    score=score+100;
    emerald.destroy();
  }
}

function caught(){
  if(thief.isTouching(cop1) || (thief.isTouching(cop2))) {
    gameState="end";
  }
  if(thief.isTouching(laser) || (thief.isTouching(l2))){
    gameState="end";
  }

}

function wallDisappear(){
  if(thief.isTouching(w10)){
    w10.destroy();
  }
}

function win(){
  if(thief.isTouching(exit)){
    fill("red");
    textSize(40);
    text("Game Over. You Win. You finished with " + score +" dollars", dw/2-300, dh/2);
    cop1.velocityX=0;
    cop2.velocityX=0;
    laser.velocityY=0;
  }
}