
var mql = window.matchMedia('(max-width: 600px)');

var canvas = document.getElementById("bg") //global variable
var W,H;
   



function screenTest(e) {
    console.log("in screen test")

  if (e.matches) {
    /* the viewport is 600 pixels wide or less */
    document.getElementById("arcade").style.display = "center";
   // console.log(document.getElementById("arcade"))
    canvas.width = 300
    canvas.height=400

  } else {
    /* the viewport is more than than 600 pixels wide */
    document.getElementById("arcade").style.display = "none";
    canvas.width = 500
    canvas.height=300
    console.log("in else")
  }
}

screenTest(mql);


//console.log(canvas.width,canvas.height)


function init() {
  
    screenTest(mql);   

    W=canvas.width
    H=canvas.height
    
    console.log(W,H)

    pen = canvas.getContext("2d")
    cs = 10
    score = 0
    food = createfood();
    speed = 150
    n=0
    snake = {

        init_length: 5,
        
        cells: [],
        //cell size

        direction: "right",

        createSnake: function () {


            for (var i = this.init_length; i > 0; i--) {
                this.cells.push({ x: i, y: 1 });
            }

        },

        
        drawSnake: function () {

            if (this.cells[0].x * (cs) > W-2 || this.cells[0].y * (cs) > H-2 || this.cells[0].x * (cs-1) < 0 || this.cells[0].y * (cs-1) < 0 ) {
                clearInterval(f);
                console.log("game over");
                window.alert("Better luck next time!");
                
            }

            pen.fillStyle = "black";

            for (var i = 0; i < this.cells.length; i++) {
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs-1, cs-1 );
            }

        },//drawsnake


        updateSnake : function () {

            x = this.cells[0].x
            y = this.cells[0].y
            var nextX, nextY;

            if (x == foodX && y == foodY) { //foodeaten
                this.cells.push(food);
                score++;
                food=createfood();
                speed>60 ? speed = speed-5 : speed;
                resetSpeed(speed);
                updateScore();     
            }

            else{

                this.cells.pop();
            }

            if (this.direction == "right") {
                nextX = x + 1;
                nextY = y;
            }
            if (snake.direction == "left") {
                nextX = x - 1;
                nextY = y;
            }
            if (snake.direction == "up") {
                nextX = x;
                nextY = y - 1;
            }
            if (snake.direction == "down") {
                nextX = x;
                nextY = y + 1;
            }

            //console.log(this.cells.length);

            this.cells.unshift({ x: nextX, y: nextY });

        }

    }//snake object
    
    updateScore();
    snake.createSnake();
    try { clearInterval(f); }
    catch(err){ console.log("Loading..")}
    f = setInterval(gameloop,this.speed)
    
}//init

function resetSpeed(n){
   // console.log(n)
    clearInterval(f);
    f = setInterval(gameloop,n)
}



function draw() {
    pen.clearRect(0, 0, W, H)
    snake.drawSnake();
    drawFood();

}


function update() {
    snake.updateSnake();
}


function updateScore() {
    var text = document.getElementById("score");
    text.innerHTML=score;
   // console.log(score,speed);   
}


function keypressed(e) {
    //console.log(e.key);
    if (e.key == "ArrowUp" || e.key == "w") {
        snake.direction = "up"
    }
    else if (e.key == "ArrowDown" || e.key == "s") {
        snake.direction = "down"
    }
    else if (e.key == "ArrowLeft" || e.key == "a") {
        snake.direction = "left"
    }
    else if (e.key == "ArrowRight" || e.key == "d") {
        snake.direction = "right"
    }
    else {
        console.log("Key pressed", e.key);
    }

}

function createfood() {
    foodX = Math.round(Math.random() * (W - cs) / cs)
    foodY = Math.round(Math.random() * (H - cs) / cs)
    var food = {
        x: foodX,
        y: foodY
    }

    return food;

}
function drawFood() {
    pen.fillStyle = "red";
    pen.fillRect(food.x * cs, food.y * cs, cs - 1, cs - 1);
   
}

function gameloop() {
    draw();
    update();
  //  console.log("In gameloop")
}

document.addEventListener('keydown', keypressed);

init();

var button=document.getElementById("start");
button.addEventListener('click',restart)
function restart(){
    init();
    console.log("Game Restarted");
}

//f = setInterval(gameloop, this.speed);

// snake.drawSnake();

