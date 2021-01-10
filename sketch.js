//Create variables here
var dog,happyDog,dogImg,happyDogImg,database,foodS,foodStock;
var fedTime,lastFed,feed,addFood,foodObj;
var bedRoom_img,washRoom_img,garden_img;
var readGameState,changeGameState;
var gameState,readState,changeState;
var currentTime;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");

  bedRoom_img = loadImage("images/Bed Room.png");
garden_img = loadImage("images/Garden.png");
washRoom_img = loadImage("images/Wash Room.png");


}

function setup() {
  createCanvas(500, 500);

 
  database = firebase.database();
  foodObj = new Food();
  dog = createSprite(300,300,10,10);
  dog.scale = 0.2;
  dog.addImage(dogImg);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed = createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();

    fedTime = database.ref("FeedTime");
    fedTime.on("value",function(data){
      lastFed = data.val();
    });

  });
}


function draw() { 
 currentTime = hour();
  
 if(currentTime == (lastFed + 1)){
   update("Playing");
   foodObj.garden();
 }
 else if(currentTime == (lastFed + 2)){
   update("Sleeping");
   foodObj.bedRoom();
 }
  else if(currentTime>(lastFed + 2) && currentTime<=(lastFed + 4)){
    update("Bathing");
    foodObj.washRoom();
  }
  else{
    update("Hungry")
    foodObj.display();
  }

if(gameState !== "Hungry"){
  feed.hide();
  addFood.hide();
  dog.remove();
}
else{
  feed.show();
  addFood.show();
  dog.addImage(dogImg);

}

 


  

  drawSprites();
  //add styles here

  
 



}

function readStock(data){


  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog(){
  dog.addImage(happyDogImg);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref("/").update({
    Food : foodObj.getFoodStock(),
    FeedTime: hour(),
    gameState: "Hungry"
  })
}

function addFoods(){
  foodS ++ 
  database.ref("/").update({
    Food: foodS
  })
}

function update(state){
  database.ref("/").update({
    gameState: state
  })
}





