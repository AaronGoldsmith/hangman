 var wordlist = new wordList();
 let alph = "abcdefghijklmnopqrstuvwxyz";	
 let hist = [];
 let progressWord = [];

class Man
{
  	constructor(x,y){
		this.x = x;
	  	this.y = y;
	    this.deathCount = 0;
    }

  	whatDraw(index){
	  angleMode(DEGREES);

		switch(index){
			case(0):  stroke("#fb7410aa"); strokeWeight(6);
					  line(this.x,this.y-45,this.x,this.y+20);return;
			case(1): ellipse(this.x,this.y,50,50); return;
	  		case(2):
	  			line(this.x,this.y+25, this.x, this.y +90); return;
			case(3):
				push(); translate(this.x,this.y+25)
				rotate(25+map(mouseY,0,width,0,100));
				line(0,0, 0, 60);
				strokeWeight(1);
				translate(0,60);
			    rotate(-15)
				for(var i = 0;i<4;i++){
					line(0,0,0,10);
				  	rotate(15);
				} 
				rotate(20);
				line(0,0,0,10);
				pop(); return;
			case(4):
				push(); translate(this.x,this.y+25); 
				rotate(-25+map(mouseX,0,width,0,-100));
				line(0,0, 0, 60);
				strokeWeight(1);
				translate(0,60);
				rotate(-15);
				//fingers
				for(var j = 0;j<4;j++){
					line(0,0,0,10);
				  	rotate(15);
				} // thumb
				rotate(10);
				line(0,0,0,10);

				pop(); return;
			case(5):
				push(); translate(this.x,this.y+88);
				rotate(15);
				line(0,0,0,80);
				pop(); return;
			case(6):
				push(); translate(this.x,this.y+88);
				rotate(-15);
				line(0,0,0,80);
				pop(); return;
			
		  default: return;
				
		}
	}
  display(){
   
	  for(var i =0;i<=this.deathCount;i++){
		strokeWeight(4)
		stroke(0);
		fill(255)
		this.whatDraw(i);
	  }
  }


}

let man;
let secretWord 
function drawHanger(){
  	strokeWeight(8);
    stroke(0);
	push()
  	translate(width-20,20)
    line(0,0,0,height-40);
    line(0,0,-200,0);
  	translate(0,height-40);
  	fill(0);
  	rect(10,0,-70,10);
    pop();
}
function drawNoose(x,y){
  	    strokeWeight(1)
  		stroke(0);
  		fill("#fb7410aa");
		
  		for(var i = 0;i<21;i+=3){
			ellipse(x,y-5+i,20,3);
		}
    	// vertically hanging  rope
  		strokeWeight(6);
  		stroke("#fb7410aa");
  		line(x,y-79,x,25);
		

	
}
function setup() {
  var canvas = createCanvas(400, 400);
  canvas.parent('canvas-holder');
  strokeWeight(2);
  stroke(0);
  rect(0,0,width,height);


  man = new Man(width/2,height/2-50);
  secretWord = wordlist.get();
  console.log(secretWord);
  for(var j = 0;j<secretWord.length;j++){
  	progressWord.push("-");
  }  
}

function draw() {
  background(255);
  man.display(); 
  drawHanger()
  drawNoose(width/2,height/2-20)
  fill(0);
  noStroke();

  
}

function checkLetter(L){
    return (alph.indexOf(L)>=0 && hist.indexOf(L)<0 && progressWord.indexOf(L)<0);
}
function indicesOf(arr,val){
    var c = [];
    for(var i = 0;i<arr.length;i++){
        
    }
}

function update(){
    var h = "";
    var p = "";
    hist.forEach(letter => {
        h += ("<li class='text-danger'>"+ letter+"</li>");
    });
    progressWord.forEach(char =>{
        p += ("<li class='text-success'>"+char+"</li>");
    });
     document.getElementById("history").innerHTML = h;
     document.getElementById("solvedWord").innerHTML = p;
}
document.onkeyup = function(event){

        // check if letter is in alphabet 
        // check if letter has been pressed already
		if(checkLetter(event.key) && man.deathCount<=5){
              hist.push(event.key);
              var sindex = secretWord.indexOf(event.key);
              if(sindex==-1){
                man.deathCount++;     
              }
              else{
                progressWord[sindex] = event.key;
                hist.pop();
              }
           }
		update();
   
			
}
		
	 