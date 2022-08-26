var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var dino = {
 x : 10,
 y : 200,
 width : 50,
 height : 50,
 draw(){    
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x,this.y, this.width, this.height);
 }
};

dino.draw();

class Cactus{
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){    
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x,this.y, this.width, this.height);
    }
}

var timer = 0;
var jumpTimer = 0;
var cactusArray = [];
var animation;

function frameExecute(){
    animation = requestAnimationFrame(frameExecute);
    timer++;

    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    if(timer % 200 == 0){
        var cactus = new Cactus();
        cactusArray.push(cactus);
    }

    cactusArray.forEach((a, i, o)=>{
        //x 좌료팍 0미만이면 선인장 제거
        if(a.x < 0){
            o.splice(i,1);
        }
        a.x--;

        isCollision(dino, a);

        a.draw();
    });



    if(jumping == true){
        dino.y--;
        jumpTimer++;
    }
    if(jumping == false){
        if(dino.y < 200){
            dino.y++;
        }
    }
    if(jumpTimer > 100){
        jumping = false;
        jumpTimer = 0;
    }

    dino.draw();
}



frameExecute();

//충돌 확인 

function isCollision(dino, cactus){
    var xDiffer = cactus.x - (dino.x + dino.width);
    var yDiffer = cactus.y - (dino.y + dino.height);
    if(xDiffer < 0 && yDiffer < 0){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);     
    }
}

var jumping = false;
document.addEventListener('keydown', function(e){
    if(e.code === 'Space'){
        jumping = true;
    }
});