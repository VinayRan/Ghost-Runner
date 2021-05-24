var gameState = "play";
var tower, towerImage;
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup;
var ghost, ghostImage;
var invisibleBlock, invisibleBlockGroup;
var spookySound;






function preload(){
  
  
 
  
  towerImage=loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png")
  spookySound = loadSound("spooky.wav")
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
  
}


function setup(){
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage(towerImage);
  tower.velocityY = 2;
  
  ghost = createSprite(300, 300);
  ghost.addImage(ghostImage);
  ghost.scale = 0.4;
  
  //invisibleBlock.visible = false;
  }


function draw(){
   
  if(gameState === "play"){
     
     
  
  if(tower.y>400){
      tower.y = 300;
      }
  
  if(keyDown("left_arrow")){
     ghost.x = ghost.x - 3;
    
     }
  
   if(keyDown("right_arrow")){
     ghost.x = ghost.x + 3;
    
     }
  
  
   if(keyDown("space")){
     ghost.velocityY = -5;
    
     }
  
     //add gravity
  ghost.velocityY = ghost.velocityY + 0.5;
  
  
  
  if(climberGroup.isTouching(ghost)){
     ghost.velocityY = 0;
     }
  
  
  
  spawnDoors();
   
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
      ghost.destroy();
      gameState="end";
       }
    
  drawSprites();
  }
    if(gameState === "end"){
      textSize(50);
      stroke("blue")
      fill("blue");
      text("Game Over!", 180, 250);
      spookySound.play();
      
    }
  
  
  
  
}



function spawnDoors(){
  if(frameCount%240=== 0){
     door = createSprite(200, -50)
     door.x = Math.round(random(100, 500))
     door.addImage(doorImage);
     door.velocityY = 2;
     door.lifetime = 300;
     doorGroup.add(door);
     ghost.depth = door.depth +1;
    
    climber = createSprite(door.x, 10)
    climber.addImage(climberImage);
    climber.velocityY = 2;
    climber.lifetime = 300;
    climberGroup.add(climber);
    //climber.debug = true;
    
    invisibleBlock = createSprite(door.x, 15, climber.width, 5);
    invisibleBlock.velocityY = 2;               
    invisibleBlock.lifetime = 300;
    invisibleBlockGroup.add(invisibleBlock);
    
    

    
 }
}
  