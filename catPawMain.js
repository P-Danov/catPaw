const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

canvas.width = 1224;
canvas.height = 776;


const fps = 120;
let degreeRandom;
let theY=0;
let catPawsArray = []
let catPawsTraceArray = []
let catPawScoreCount = 0
const meowSound1 = new Audio('sounds/meow1.wav');
const meowSound2 = new Audio('sounds/meow2.wav');
const meowSound3 = new Audio('sounds/meow3.wav');
const meowSound4 = new Audio('sounds/meow4.wav');
const meowSound5 = new Audio('sounds/meow5.wav');
const meowSoundArray = [meowSound1,meowSound2,meowSound3,meowSound4,meowSound5]
const catPawImageArray = ["images/catPaw.png","images/catPaw2.png"]

class CatPaw{
    constructor({position},degreeRandom){
        this.position = position
        this.image = new Image()
        this.catPawRandom = Math.round(Math.random()*1)
        this.image.src = catPawImageArray[this.catPawRandom]
        console.log(this.image.src)
        this.imageTrace = new Image()
        this.imageTrace.src = "images/catPawTrace.png"
        this.degreeRandom = degreeRandom
        this.theY=0
        this.catPawMoveBack = false

    }
    draw(){
        if(!this.catPawMoveBack){
            this.theY-=8
            if(this.position.y-20>this.position.y+1000+this.theY){
                this.catPawMoveBack = true
                //this.meowSound.play();
                this.meowRandom = Math.round(Math.random()*4)
                console.log(this.meowRandom)
                meowSoundArray[this.meowRandom].play();
                catPawScoreCount++
                document.getElementById('score').innerHTML = 'Cat Paws : '+catPawScoreCount
                
            }
        }
        else if(this.catPawMoveBack){
            this.theY+=8
        }
        c.save();       
        c.translate(this.position.x,this.position.y)  
        c.rotate(360/this.degreeRandom)
        c.translate(-this.position.x,-this.position.y)
        if(this.catPawMoveBack){
            c.drawImage(this.imageTrace,this.position.x-15,this.position.y,45,40,)
        }
        c.drawImage(this.image,this.position.x-20,this.position.y+1000+this.theY,60,1400,)
        c.restore();
    }
}
function catPawOnClick(event){
    if(event.clientX>5&&
        event.clientX<1227&&
        event.clientY>5&&
        event.clientY<781
    ){
        degreeRandom = Math.round((Math.random()*16)-8)
        catPawsArray.push(new CatPaw({position:{x:event.clientX,y:event.clientY}},degreeRandom))
    }

}
function restart(){
    catPawsArray = []
    catPawsTraceArray = []
    catPawScoreCount = 0
    document.getElementById('score').innerHTML = 'Cat Paws : '+catPawScoreCount
}
function animate(){
    c.clearRect(0,0,canvas.width,canvas.height)
    
    catPawsArray.forEach((catPaw) =>{
        catPaw.draw()
    })

    setTimeout(() => {
        requestAnimationFrame(animate);
      }, 1000 / fps)
}
window.addEventListener('click',catPawOnClick)
animate();

