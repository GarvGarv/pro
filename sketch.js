var commando, enemy, bullet, people, commandoImg1;
var score, enemy1Group, enemy2Group, enemy3Group, enemy4Group, bulletGroup, peopleGroup;
var gameState = 1;

function preload(){
  bullet1 = loadImage("sprites/bullet.png");
  backgroundImage = loadImage("sprites/bg.jpg");
  commando_shooting = loadAnimation("sprites/5.png","sprites/6.png","sprites/7.png","sprites/8.png");
  devil1 = loadAnimation("sprites/11 (2).png","sprites/22 (2).png","sprites/33.png");
  devil2 = loadAnimation("sprites/a1.png","sprites/a2.png");
  devil3 = loadAnimation("sprites/b1.png","sprites/b2.png","sprites/b3.png","sprites/b4.png");
  devil4 = loadAnimation("sprites/c61.png", "sprites/c1.png","sprites/c2.png","sprites/c3.png","sprites/c4.png","sprites/c5.png");
  people1 = loadAnimation("sprites/d1.png", "sprites/d2.png","sprites/d3.png","sprites/d4.png","sprites/d5.png","sprites/d6.png");

}

function setup(){
    createCanvas(1500,700);
    
    scene = createSprite(850,350,1500,700);
    scene.addImage(backgroundImage);
    scene.x = scene.width /2;
    scene.scale = 2;
    //creating commando
    commando = createSprite(1400,350,30,100);
    commando.addAnimation("shooting",commando_shooting);
    score = 0;
    bulletGroup= new Group();
    peopleGroup= new Group();
    enemy1Group= new Group();
    enemy2Group= new Group();
    enemy3Group= new Group();
    enemy4Group= new Group();
}

function draw(){
    background(0);
    // moving ground
    scene.velocityX = -3 

    if (scene.x < 0){
      scene.x = 1500;
    }

    if(gameState === 1){
    //making commando move with mouse
    commando.y=mouseY;

    //creating bullets for commando
    if (keyWentDown("down")) {
        createBullet();
        commando.changeAnimation("shooting",commando_shooting);
    }
    
    //calling function for people and enemy
    people();

    var select_enemy = Math.round(random(1,4));
  
    if (frameCount % 40 === 0) {
        if (select_enemy === 1) {
            enemy1();
        } else if (select_enemy === 2) {
            enemy2();
        } else if (select_enemy === 3) {
            enemy3();    
        } else {
            enemy4();
    }
  }
  if (bulletGroup.isTouching(enemy1Group)) {
    enemy1Group.destroyEach();
      bulletGroup.destroyEach();
      score=score+3;
    }
  if (bulletGroup.isTouching(enemy2Group)) {
    enemy2Group.destroyEach();
      bulletGroup.destroyEach();
      score=score+2;
    }  
  if (bulletGroup.isTouching(enemy3Group)) {
    enemy3Group.destroyEach();
      bulletGroup.destroyEach();
      score=score+1;
  }  
  if (bulletGroup.isTouching(enemy4Group)) {
    enemy4Group.destroyEach();
      bulletGroup.destroyEach();
      score=score+4;
  }
  if (bulletGroup.isTouching(peopleGroup)) {
      peopleGroup.destroyEach();
      bulletGroup.destroyEach();
      score=score-10;
      gameState = 0;
    }
  
    drawSprites();
    textSize(50);
    fill("white");
    text("Score: "+ score, 300,50);
    }
    else{
        background("black");
        fill("white");
        text("Game Over! Do not hit innocent people.",300,50);

    }
}

//function to create the bullets
function createBullet() {
    var bullet= createSprite(100, 100, 20, 10);
    bullet.addImage(bullet1);
    bullet.scale=0.01;
    bullet.x = 1350;
    bullet.y = commando.y;
    bullet.velocityX = -4;
    bulletGroup.add(bullet);
    
}

//function to create the enemy
function enemy1() {
        var enemy1  = createSprite(0,Math.round(random(20, 650)), 20, 60);
        enemy1.addAnimation("devil1",devil1);
        enemy1.scale = 0.8;
        enemy1.velocityX = 3;
        enemy1.velocityY = 0.2;
        enemy1Group.add(enemy1);
        
}
function enemy2() {
        var enemy2  = createSprite(0,Math.round(random(20, 650)), 20, 60);
        enemy2.addAnimation("devil2",devil2);
        enemy2.scale = 1.2;
        enemy2.velocityX = 3;
        enemy2.velocityY = 0.2;
        enemy2Group.add(enemy2);
}
function enemy3() {
        var enemy3  = createSprite(0,Math.round(random(20, 650)), 20, 60);
        enemy3.addAnimation("devil3",devil3);
        enemy3.scale = 1.2;
        enemy3.velocityX = 3;
        enemy3.shapeColor ="green";
        enemy3Group.add(enemy3);
}
function enemy4() {
        var enemy4  = createSprite(0,Math.round(random(20, 650)), 20, 60);
        enemy4.addAnimation("devil4",devil4);
        enemy4.velocityX = 3;
        enemy4.shapeColor = "blue";
        enemy4Group.add(enemy4);
}

//function to create the enemy
function people() {
    if(frameCount % 60 === 0){
        var people  = createSprite(0,Math.round(random(20, 650)), 10, 60);
        people.addAnimation("people1",people1);
        people.scale=0.2;
        people.velocityX = 3;
        people.shapeColor = "white";
        peopleGroup.add(people);
    }
}    
    
     
  