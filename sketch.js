var PLAY = 0;
var END = 1;
var gameState = PLAY;
var survivalTime = 0;
var monkeyImg;
var monkey;
var hurdlesGroup;
var bananaGroup;
var ground;
var bananaImg;
var hurdleImg;
var survivalTime = 100;

function preload() {
  monkeyImg = loadImage("images/download.png");
  bananaImg = loadImage("images/download (2).png");
  hurdleImg = loadImage("images/download (1).png");
}
function setup() {
  monkey = createSprite(100, 340, 50, 50);
  monkey.addImage(monkeyImg);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 800, 10);
  ground.x = ground.width/2;

  hurdlesGroup = createGroup();
  bananaGroup = createGroup();
  }
function draw() {

 monkey.setCollider("circle", 0, 0, 250);
  background(255);
  stroke("black");
  textSize(30);
  fill("black");
  text("Survival time : " + survivalTime, 100, 50);
  
  // console.log("Monkey X : " + monkey.x);
  // console.log("Monkey Y : " + monkey.y);
  
   if(keyDown("space") && (monkey.y >= 320)){
     //console.log('Inside space '+ monkey.y);
    monkey.velocityY = -15;
  }
  if(gameState === PLAY){

    ground.velocityX = -4;

  if (ground.x < 0){
  ground.x = ground.width/2;
  }
  // console.log("Monkey Y inside Play 1 : " + monkey.y );
   monkey.velocityY = monkey.velocityY + 0.8;
  // console.log("Monkey Y inside Play 2 : " + monkey.y );

  // survivalTime = survivalTime + Math.round(frameRate / 60);
   bananas();
   hurdles();
   
  // console.log("Monkey Y inside Play 3 : " + monkey.y );
   if(hurdlesGroup.isTouching(monkey)){
    survivalTime -= 50;
  }
  if(survivalTime <= 0) {
    gameState = END;
  }
  }
  else if(gameState === END){
    // console.log("Monkey Y inside End : " + monkey.y );
    ground.velocityX = 0;
    monkey.velocityY = 0;
    hurdlesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    hurdlesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red");
    textSize(30);
    text("game over", 200, 200);
  }
   
  // console.log("Monkey Y outside END 1: " + monkey.y );   
  monkey.collide(ground);
  // console.log("Monkey Y outside END 2: " + monkey.y );
  drawSprites();
  
}

function bananas(){
  if(frameCount % 80 === 0){
    var banana = createSprite(400, random(120, 100), 50, 50);
      banana.addImage(bananaImg);
      banana.scale = 0.05;
      banana.velocityX = -3;
      banana.lifetime = 134;
      banana.depth = monkey.depth;
      monkey.depth = monkey.depth + 1;
      bananaGroup.add(banana);
    }
}

function hurdles(){
  if(frameCount % 300 === 0){
    var hurdle = createSprite(400,335,10,40);
      hurdle.addImage(hurdleImg);
      hurdle.scale = 0.15;
      hurdle.velocityX = -6;
      hurdle.lifetime = 70;
      hurdlesGroup.add(hurdle);
  }
}

function camera() {
  for(var monkey in allPlayers){
    // add 1 to the index for every loop
    index += 1;
    // position the cars a little away from each other in x direction
    x = x + 200;
    // use data from the database to display the cars in the y direction
    y = displayHeight - monkey.distance;
    cars [index - 1].x = x;
    cars [index - 1].y = y;

    if(index === player.index) {
      cars [index - 1].shapeColor = 'red';
      camera.position.x = displayWidth / 2;
      camera.position.y = cars[index - 1].y

    }
  }
}
