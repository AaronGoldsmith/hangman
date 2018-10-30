 var wordlist = new wordList();
 let alph = "abcdefghijklmnopqrstuvwxyz";	
 let hist = [];
 const MAX_LIVES = 6;
 let progressWord = [];
 var canvas;
 var secretWord; 

 var gameover = false;
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
function drawRope(x,y){
  	  strokeWeight(1)
  		stroke(0);
  		fill("#fb7410aa");
		
  		for(var i = 0;i<21;i+=3){
			  ellipse(x,y-5+i,20,3);
		  }
    	// vertically hanging rope
  		strokeWeight(6);
  		stroke("#fb7410aa");
  		line(x,y-79,x,25);
}
function setup() {
  canvas = createCanvas(444, 444);
  canvas.parent('canvas-holder');
  strokeWeight(2);
  stroke(0);
  rect(0,0,width,height);
	reset()

}
function reset(){
		gameover = false;
		man = new Man(width/2,height/2-50);
    secretWord = wordlist.get().split('');
		hist = [];
		for(var j = 0;j<secretWord.length;j++){
			progressWord.push("-");
		} 
		pauseAndUpdate();
}
function draw() {
  background(255);
  man.display(); 
  drawHanger()
  drawRope(width/2,height/2-20)
  fill(0);
  noStroke();
}

function checkLetter(L){
    return (alph.includes(L) && hist.indexOf(L)<0 && progressWord.indexOf(L)<0);
}

function update(){
    var h = "";
    var p = "";
    if(hist.length==0){
				let ptext = "<p> Type a letter to see if it's in the word </p>"
        $("#history").html(ptext);
    }
    hist.forEach(letter => {
        h += ("<li class='text-danger'>"+ letter+"</li>");
    });
    progressWord.forEach(char =>{
        p += ("<li class='text-success'>"+char+"</li>");
    });
     $("#history").html(h);
     $("#solvedWord").html(p);
}

function getIndices(arr,lettr){
    var ind = [];
    for(var i = 0;i<arr.length;i++){
      if(arr[i]==lettr) ind.push(i);	
    }
    return ind;
}
 
function hasLives(){
	return man.deathCount<MAX_LIVES;
}

function pauseAndUpdate(){
	setTimeout(function() {
		update();
	}, 50);
}
function displayMeta(){
	if(man.deathCount>=MAX_LIVES){
		gameover=true;
	 $('#winlose').html($("<h1>").text("YOU LOSE" ))
	 $('#results').html($("<p>").text(`the word was:  ${secretWord.join("")}`));
	 $('#winlose').attr("class","bg-danger")
	 $('#gameover').modal('show')
 }
 if(progressWord.indexOf("-")==-1){
	 gameover=true;
	 $('#winlose').html($("<h2>").text("Great Job!"));
	 $('#winlose').append($('<h2>').text('your word was'))
	 $('#results').html($('<h3>').text(secretWord.join("")))
	 $('#results').attr("class","bg-success")
	 $('#gameover').modal('show')
 }
	$(document).on("click","#Playagain",function(){
		$('#gameover').modal('dispose');
		reset();
		canvas.clear();
		pauseAndUpdate();
	})
}
	

/*
	1. 		check if letter is in alphabet, hasn't been pressed
	2.    check if still playing
	3.    prevent player from seeing letters they correctly guessed adjacent to ones they incorrectly guessed
*/
document.onkeyup = function(event){
		var letter = event.key
		if(checkLetter(letter) && hasLives()){
    	hist.push(letter);
      if(!secretWord.includes(letter)){
      	man.deathCount++; 
      }
      else{
      	 var indices = getIndices(secretWord,letter)
         for(var index = 0;index< indices.length;index++){
            progressWord[indices[index]] = letter;
          }
       hist.pop(); 
     }
      pauseAndUpdate();
	 }
		displayMeta();
}
		
	 