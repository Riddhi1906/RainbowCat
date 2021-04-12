//desclaration
var START = 1;
var END = 0;
var PLAY = 2;
var gamestate = 1;

var cat, cat_running;
var donut, donutImage;
var obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var back, back2;
var ground,roof,text1;
var holeG,doughG;

var hole111;
var dough1;
var score;

var time = 0;
var EatT = 0;
var deaths = 0;


function preload() {

//loading Images
cat_running = loadAnimation("1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png", "11.png", "12.png");

cat_still = loadImage("12.png");

back1 = loadImage("bg.png");

donutImage = loadImage("banana.png");
  
obstaceImage = loadImage("obstacle.png");

text11 = loadImage("inst.png");

dough1 = loadImage("doughnut.png");

hole111 = loadImage("hole.png");

//loading sound
song = loadSound("orignal.mp3");
ding  = loadSound("point.mp3");  

}

function setup() {
  //creating canvas
  createCanvas(windowWidth, windowHeight);
  background("black");

  //creating sprites,adding images,scaling
  
  back2 = createSprite(width / 2, height - 300, width, 300);
  back2.addImage(back1);
  back2.x = back2.width / 2;


  back = createSprite(width / 2, height - 300, width, 300);
  back.addImage(back1);
  back.x = back.width / 2;
  back.velocityX = -(7 + time * 1.5 / 50);

  cat = createSprite(50, height - 100, 20, 20);
  cat.addAnimation("running", cat_running);
  cat.scale = 0.5;

  text1 = createSprite(width / 2, height - 260, width, 20);
  text1.addImage(text11);
  text1.scale = 0.6;

  ground = createSprite(width / 2, height - 0, width, 20);

  roof = createSprite(width / 2, windowHeight, width, 20);

  //creating new groups
  doughG = new Group();
  holeG = new Group();
}

function draw() {
  background("lightblue")

  //backgrohung image settings
  if (back.x < 0) {
    back.x = back.width / 2;
  }

  //flying cat with upper arrow
  if (keyDown(UP_ARROW) && cat.y >= 160) {
    cat.velocityY = -12;
  }

  //gravity
  cat.velocityY = cat.velocityY + 1;

  //cat collidation with ground and roof
  cat.collide(ground);
  cat.collide(roof);

  
  if (gamestate === START) {
    back.velocityX = 0;
    
    //background clour
    background("black");

    //destroy each grp at satrting so they doesn't come on screen
    doughG.destroyEach();
    holeG.destroyEach();

   //starting game its s key is pressed or touching anywhere on mobile screen
   if ((touches.length > 0 || keyDown("s"))) {
      song.play();
      gamestate = PLAY;
      touches = [];
    }
   back2.visible = true;
 }

  //when the game starts
  if (gamestate === PLAY) {
     back.velocityX = -5;
     if (back.x < 550) {
       back.x = back.width / 2
      }
    text1.visible = false;

    //make the cat go up is up arrow is pressed or use touches for mobile
    if ((touches.length > 0 || keyDown(UP_ARROW)) && cat.y >= 100) {
      cat.velocityY = -8;
      touches = [];
    }
    back2.visible = true;
    //giving time 
    if (frameCount % 20 == 0 && time < 10000) {
     time = time + 1;
    }

    //giving point
    if (cat.isTouching(doughG)) {
      doughG.destroyEach();
      EatT = EatT + 1;
    }
    
    //player die
    if (cat.isTouching(holeG)) {
      holeG.destroyEach();
      gamestate = END;
    }
  }

  //when the state isEND
   if (gamestate === END) {
    //deleting cat and background after losing/dieing
    back.visible = false;
    cat.visible = false;
    background("blue");

    background("black");
    doughG.destroyEach();
    holeG.destroyEach();

    EatT.y = 200;
    EatT.x = 250;

    back2.visible = false;
    //restart text
    textSize(20);
    text("GAME OVER", width / 2, height/2 - 30);
    text("Press 'R' to play again.", width / 2, height/2);
 
    //stop the sound
    song.stop();
    reset();
  }
   
  //calling the groups in draw function
  dough();
  hole();

  drawSprites();

  //texts to display
  fill(300);
  textSize(20);
  text("Time: " + time, width - 100, 75);
  text("Doughnuts eaten: " + EatT, width - 190, 50);
  text("Deaths " + deaths, 20, 50);
 }