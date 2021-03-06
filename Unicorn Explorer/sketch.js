var unicorn, unicornImg, unicornCollided
var  invisibleGround, groundImage;

var stone, stoneImg, stonesGroup;
var bush, bushImg, bushGroup;


var gameover,gameoverImg;
var restart, restartImg;




//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  unicornImg = loadAnimation("unicorn-1.png","unicorn-3.png","unicorn-4.png");
 unicornCollided = loadImage("unicorn-3.png")
  
  
  
  stoneImg = loadImage("stone.png");
  
  bushImg = loadImage("bush.png");
 

  gameoverImg = loadImage ("game over.png");
  restartImg = loadImage ("restart.png");

}

function setup() {
  createCanvas(600, 200);
  
  unicorn = createSprite(50,180,20,50);
  unicorn.addAnimation("running", unicornImg);
  unicorn.addAnimation("collided", unicornCollided);
  unicorn.scale = 0.5;
  

  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  stonesGroup = new Group();
  bushGroup = new Group();
  


gameover = createSprite(300,100,20,30);
gameover.addImage(gameoverImg);
gameover.scale=0.5;
gameover.visible = false;
   
restart = createSprite(300,140,20,30);
restart.addImage(restartImg);  
restart.scale=0.5;  
restart.visible = false;
 
  
}

function draw() {
  background(180);
  
 

  if(gameState === PLAY) {
     //ground.velocityX = -(4+2*score/100);
    if(keyDown("space")&& unicorn.y>=161) {
    unicorn.velocityY = -10;
  }
  
  unicorn.velocityY = unicorn.velocityY + 0.5
  
  if (invisibleGround.x < 0){
    invisibleGround.x = invisibleGround.width/2;
  }
      spawnBush();
  spawnStone();
  if(stonesGroup.isTouching(unicorn) || bushGroup.isTouching(unicorn)){
      gameState = END;
     
    }
  
  }
  
else if(gameState === END) {  
   gameover.visible = true;
    restart.visible = true;
    
   
    invisibleGround.velocityX = 0;
    unicorn.velocityY = 0;
    stonesGroup.setVelocityXEach(0);
    bushGroup.setVelocityXEach(0);
    
   
    unicorn.changeAnimation("collided",unicornCollided);
    
  
    stonesGroup.setLifetimeEach(-1);
    bushGroup.setLifetimeEach(-1);
}
  
if(mousePressedOver(restart)) {
    reset();
  }  
  
  
  unicorn.collide(invisibleGround);

  drawSprites();
}

function spawnStone() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var stone = createSprite(600,120,40,10);
    stone.y = Math.round(random(80,120));
    stone.addImage(stoneImg);
    stone.scale = 0.5;
    stone.velocityX = -3;
    
     //assign lifetime to the variable
    stone.lifetime = 200;
    
    //adjust the depth
    stone.depth = unicorn.depth;
    unicorn.depth = unicorn.depth + 1;
    
    //add each stone to the group
    stonesGroup.add(stone);
  }
  
}

function spawnBush() {
  if(frameCount % 60 === 0) {
    var bush = createSprite(600,165,10,40);
    bush.y = Math.round(random(80,120));
    bush.addImage(bushImg);
    bush.scale = 0.5;
    bush.velocityX = -3;
    //bush.velocityX = -(4+score/100);
    
    bush.depth = unicorn.depth;
    unicorn.depth = unicorn.depth + 1;
    
    
    
    
    //assign scale and lifetime to the bush           
    bush.scale = 0.5;
    bush.lifetime = 300;
    //add each bush to the group
    bushGroup.add(bush);
  }
}

function reset(){
  gameState = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  
  stonesGroup.destroyEach();
  bushGroup.destroyEach();
  
  unicorn.changeAnimation("running", unicornImg);
  
  
  
}
