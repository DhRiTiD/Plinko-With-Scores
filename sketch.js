const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
 
var particles = [];
var particle;
var plinkos = [];
var divisions = [];
var gameState = "play";
var divisionHeight = 300;
var score = 0;
var count = 0;
var bG;

var reset;
var over, GO;

function preload(){
  bG = loadImage("p3.png");
  GO =loadImage("GO.png");
} 
function setup() {
  createCanvas(800, 800);

  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  for (var k = 0; k <= width; k = k + 80) {
   divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }
  for (var j = 75; j <= width; j=j+50){   
    plinkos.push(new Plinko(j,75));
  }
  for (var j = 50; j <= width-10; j=j+50){
    plinkos.push(new Plinko(j,175));
  }
  for (var j = 75; j <= width; j=j+50){
    plinkos.push(new Plinko(j,275));
  }
  for (var j = 50; j <= width-10; j=j+50){ 
    plinkos.push(new Plinko(j,375));
  }
}
 
function draw() {
  Engine.update(engine);
  
  if(gameState === "play"){
    
  background(bG);
  
  text(mouseX+","+mouseY,mouseX-5,mouseY-5);
      //text for scores  
      
    fill(255);
    textSize(35);
    text("Score : "+score,20,30);
    text(" 50 ", 5, 550);
    text(" 500 ", 80, 550);
    text(" 500 ", 160, 550);
    text(" 600 ", 240, 550);
    text(" 100 ", 320, 550);
    text(" 100 ", 400, 550);
    text(" 100 ", 480, 550);
    text(" 200 ", 560, 550);
    text(" 200 ", 640, 550); 
    text(" 50 ", 720, 550); 

   for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
    }
    
    for (var k = 0; k < divisions.length; k++) {
      divisions[k].display();
    }

    if(particle!=null){
      particle.display();
    
      if (particle.body.position.y>550){
        if (particle.body.position.x > 0 && particle.body.position.x < 85){
          score = score+50;      
          particle = null;
        }else if (particle.body.position.x > 85 && particle.body.position.x < 240){
          score = score+500;      
          particle = null;
        }else if (particle.body.position.x > 240 && particle.body.position.x < 325 ){
          score = score + 600;
          particle = null;
        }else if (particle.body.position.x > 310 && particle.body.position.x < 520 ) {
          score = score + 100;
          particle=null;
        }else if (particle.body.position.x > 550 && particle.body.position.x < 680 ){
          score = score + 200;
          particle = null;
        } else if (particle.body.position.x > 725 && particle.body.position.x < 800 ){
          score = score + 50;
          particle = null;
        }else if (particle.body.position.x > 800){
          score = score + 10;
          particle = null;
        }else if (particle.body.position.x < 0){
          score = score + 10;
          particle = null;
        }                             
      }
    }

      if (count >= 6){     
        gameState = "end";
      } 
      console.log(count);
    }else if(gameState === "end"){
        background(GO);          
        reset = createButton('RESET');
        reset.position(720, 30);
        reset.mousePressed(()=>{
        gameState = "play";
        count = 0;
        score = 0;
      }); 

        fill(255);
        textSize(35);
        text("Score : "+score,20,30);
        text("Well Done!!", 310, 680);
        text("Click On 'Reset' to Retry!", 235, 750);
      }
    
    /*for (var j = 0; j < particles.length; j++) {
       particles[j].display();
    }*/
  
}

function mousePressed(){
  if(gameState === "play" && mouseX<800 && mouseY<800 ){
    count++;
    particle = new Particle(mouseX, 10, 10, 10); 
  }  
}
