// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>

class Draggable {
  constructor(x, y, w, h,index,tx,r,g,b) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.input_rollover = false; 
    this.output_rollover = false; 
    this.current_pos=index;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
    this.txt = tx;
    this.r=r/255;
    this.g=g/255;
    this.b=b/255;
    this.input=[this.x-15, this.y+this.h/2]
    this.output=[this.x+ this.w+15, this.y+this.h/2]
    this.inputvalues=[]
    this.outputvalues=[]
    this.port=15
    this.value=false;
  }



  what(){
    return "device"
  }
  
  setinput(x){
    this.inputvalues.push(x);
}
setoutput(x){
  this.outputvalues.push(x);
}

  over() {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }
  inputover(x) {
    // Is mouse over object
    if (mouseX > this.input[0]-this.port/2 && mouseX < this.input[0]+this.port/2 && mouseY > this.input[1]-this.port/2 && mouseY < this.input[1]+this.port/2) {
      this.input_rollover = true;
    } else {
      this.input_rollover = false;
    }
  }
  outputover(x) {
    // Is mouse over object
    if (mouseX > this.output[0]-this.port/2 && mouseX < this.output[0]+this.port/2 && mouseY > this.output[1]-this.port/2 && mouseY < this.output[1]+this.port/2) {
      this.output_rollover = true;
    } else {
      this.output_rollover = false;
    }
  }
  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
    this.input=[this.x-10-this.port/2, this.y+this.h/2]
    this.output=[this.x+ this.w+10+this.port/2, this.y+this.h/2]
  }

  show() {
    stroke(0);
    // Different fill based on state
    
   

//input color
    if (this.input_rollover) {
      fill(255,60,60);
      stroke(255,60,60);
    } else {  
      fill(0,0,0);
      stroke(0);
    }
    strokeWeight(6)
    line(this.x, this.y+this.h/2,this.x-10, this.y+this.h/2);
    strokeWeight(1)
    ellipse(this.input[0],this.input[1],this.port,this.port)



//output color
    if (this.output_rollover) {
      fill(255,60,60);
      stroke(255,60,60);
   } else {  
     fill(0,0,0);
     stroke(0);
   }
   strokeWeight(6)
    line(this.x+ this.w, this.y+this.h/2,this.x+ this.w+10, this.y+this.h/2);
    strokeWeight(1)
    ellipse(this.output[0],this.output[1],this.port,this.port)


    //rectangle color
    stroke(0);
    strokeWeight(4)
    if (this.dragging) {
    fill(this.r*90,this.g*90,this.b*90);         
    } else if (this.rollover) {
      fill(this.r*170,this.g*170,this.b*170);
    } else {  
    fill(this.r*255,this.g*255,this.b*255);
    }
    rect(this.x, this.y, this.w, this.h,5);
    strokeWeight(1)




    fill(0, 0, 0);
    textSize(this.w/2.5);
    text(this.txt,this.x+4, this.y+(this.h/2)+6);
    
   
  }

  pressed(state) {
    // Did I click on the rectangle?
    if(!run){
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.dragging = true;
      
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
      return null
      
    }
    if (mouseX > this.input[0]-this.port/2 && mouseX < this.input[0]+this.port/2 && mouseY > this.input[1]-this.port/2 && mouseY < this.input[1]+this.port/2) {
      print(this.current_pos)
        return this.current_pos
    } 
    if (mouseX > this.output[0]-this.port/2 && mouseX < this.output[0]+this.port/2 && mouseY > this.output[1]-this.port/2 && mouseY < this.output[1]+this.port/2) {
      print(this.current_pos)
      return this.current_pos
    } }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}



class NODE {
  constructor(x, y,index) {
    this.rollover = false; // Is the mouse over the ellipse?
    this.x = x;
    this.y = y;
    
    this.value=false
    this.port=20
    this.inputvalues=[]
    this.outputvalues=[]
    this.current_pos=index;
    this.w= this.port;
    this.h = this.port;

  }

  setinput(x){
      this.inputvalues.push(x);
  }
  setoutput(x){
    this.outputvalues.push(x);
  }


  over() {
    // Is mouse over object
    if ( (mouseX > this.x-this.port/2) && (mouseX < this.x+this.port/2+this.w) && (mouseY > this.y-this.port/2) && ( mouseY < this.y + this.h+this.port/2)) {
      this.rollover = true;
      print("rolled")
    } else {
      this.rollover = false;
    }
  }

  what(){
    return "node"
  }

  show() {
    stroke(0);
    
    if((this.rollover) && (!this.value)){
       fill(250, 237, 0);
    } else if (this.value) {
      fill(255,20,20);
   }else {  
      fill(0,0,0);
    }
    ellipse(this.x, this.y, this.port,this.port);
     
  }

  pressed(state) {
    if ( (mouseX > this.x-this.port/2) && (mouseX < this.x+this.port/2+this.w) && (mouseY > this.y-this.port/2) && ( mouseY < this.y + this.h+this.port/2)) {
      if(state){
        if(this.value){
          this.value=false;
        }else{
          this.value=true;
        }        
        print(this.value)
      }else{
        print(this.current_pos)
        return this.current_pos
      }
    }
  }

  released() {
    
  }

 
}