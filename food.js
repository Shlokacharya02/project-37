class Food{
constructor(){
    this.foodStock = 0;
    this.lastFed;
    this.image = loadImage("images/Milk.png");
}

updateFoodStock(foodStock){
    this.foodStock = foodStock;
}

getFedTime(lastFed){
    this.lastFed = lastFed;
}
deductFood(){
    if(this.foodStock>0){
        this.foodStock = this.foodStock-1;
    }
}
getFoodStock(){
    return this.foodStock;
}
display(){
    background("blue");
   fill("white");
   textSize(15);
   if(lastFed>=12){
    text("Last Feed: "+ lastFed % 12 + " PM",50,30);
  }
  else if(lastFed == 0){
    text("Last Feed: 12AM" ,50,30);
  }
  else{
    text("Last Feed: "  + lastFed +" AM",50,30);
  }
    var x = 70;
    var y = 100;
    imageMode(CENTER);
    if(this.foodStock !== 0){
        for(var i = 0;i<this.foodStock;i++){
            if(i % 10 == 0){
                x = 70
                y = y + 50
            }
            image(this.image,x,y,50,50);
    
            image(this.image,x,y,50,50);
            x = x + 30;
        }
    }
}
bedRoom(){
    background(bedRoom_img,550,550)
}
garden(){
    background(garden_img,550,550);
}
washRoom(){
    background(washRoom_img,550,550);
}
}