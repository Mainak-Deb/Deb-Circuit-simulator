// Click and Drag an object

let shape1;
let shape2;
let shapes=[];
let shpcount=0;
let startpos=100;
let run=false;
let bg=155;
let state=false
let connect;



function setup() {
  createCanvas(1540, 760);

  
  andb = createButton('and');
  andb.position(0, 4);
  andb.mousePressed(and);
  
  orb = createButton('or');
  orb.position(40, 4);
  orb.mousePressed(or);
  
  notb = createButton('not');
  notb.position(70, 4);
  notb.mousePressed(not);
  
  xorb = createButton('xor');
  xorb.position(108, 4);
  xorb.mousePressed(xor);
  
  
  
  runb = createButton('run');
  runb.position(width-200, 4);
  runb.mousePressed(runthis);
  

  for(i=0;i<12;i++){
    shp=new NODE(20,120+ i*60,shpcount);
    shapes.push(shp)
    shpcount++;
  }
  for(i=0;i<12;i++){
    shp=new NODE(width-40,120+ i*60,shpcount);
    shapes.push(shp)
    shpcount++;
  }



}

function draw() {
  
  background(bg);
  
  stroke(0)
  strokeWeight(4)
  fill(55)
  rect(0,32,50,height)
  rect(width-60,32,60,height)
  fill(255)
  rect(0,32,width,68)
  
  

    for(i=0;i<shpcount;i++){

      if(shapes[i].what()=="node"){
        shapes[i].over()
        shapes[i].show();
        outputnodes=shapes[i].outputvalues
        for(let j=0;j<outputnodes.length;j++){
            l1=[shapes[i].x,shapes[i].y]
            if((outputnodes[j]>9) && (outputnodes[j]<=19)){
              l2=[shapes[outputnodes[j]].x,shapes[outputnodes[j]].y]
            }else{
              l2=shapes[outputnodes[j]].input
            }
            
            //console.log(l1,l2)
            strokeWeight(2)
            line(l1[0],l1[1],l2[0],l2[1])
        }

      }else{
        shapes[i].over();
        shapes[i].inputover();
        shapes[i].outputover();

        shapes[i].update();
        shapes[i].show();
        outputnodes=shapes[i].outputvalues
        for(let j=0;j<outputnodes.length;j++){
            l1=shapes[i].output
            if((outputnodes[j]>9) && (outputnodes[j]<=19)){
              l2=[shapes[outputnodes[j]].x,shapes[outputnodes[j]].y]
            }else{
              l2=shapes[outputnodes[j]].input
            }
            //console.log(l1,l2)
            strokeWeight(2)
            line(l1[0],l1[1],l2[0],l2[1])
        }
      }
    }
  
  


}

function mousePressed() {
    for(i=0;i<shpcount;i++){
      now=shapes[i].pressed(run);
      print(now)
      if(!state){
        if(now!=null){
            connect=now;
            state=true
            console.log("state",connect,state)
        }
      }else{
        if(now!=null){
          if(!((i>=0) && (i<=9))){
            shapes[connect].setoutput(now)
            shapes[now].setinput(connect)
            state=false
            console.log("state",connect,state)
            print(shapes[connect].outputvalues)
            print(shapes[now].inputvalues)
          }
        }
      }
        
      

    }
  
}

function mouseReleased() {
  if(!run){
     for(i=0;i<shpcount;i++){
      shapes[i].released();
    }
  }
}

function and(){
  findstartpos();
  print(shapes);
  shp=new Draggable(startpos, 40, 50, 50,shpcount,"and",240, 156, 0);
  shpcount++;
  shapes.push(shp)
}

function or(){
  findstartpos();print(shapes);
  shp=new Draggable(startpos, 40, 50, 50,shpcount,"or",0, 227, 19);
  shpcount++;
  shapes.push(shp)
}

function not(){
  findstartpos();print(shapes);
  shp=new Draggable(startpos, 40, 50, 50,shpcount,"not",224, 11, 65);
  shpcount++;
  shapes.push(shp)
}

function xor(){
  findstartpos();print(shapes);
  shp=new Draggable(startpos, 40, 50, 50,shpcount,"xor",195, 0, 217);
  shpcount++;
  shapes.push(shp)
}

function findstartpos(){
  startpos=35;
   for(i=0;i<shpcount;i++){
     if(shapes[i].y<=50){
      startpos=shapes[i].x+shapes[i].w+52;
    }
   }
   print(startpos);
}





function runthis(){
  if(run){
    run=false;
    bg=155
  }
  else{
    run=true;
    bg=50
  }
  
}
