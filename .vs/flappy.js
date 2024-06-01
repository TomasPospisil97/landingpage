//playboard
let playboard;
let playboardWidth = 360;
let playboardHeight = 640;
let context;

//flappy
let flappyWidth = 34;
let flappyHeight = 24;
let flappyX = playboardWidth/8;
let flappyY = playboardHeight/2;
let flappyImg;

let flappy = {
    x : flappyX,
    y : flappyY,
    height : flappyHeight,
    width : flappyWidth
}

//trubky
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = playboardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//fyzika hry
let velocityX = -2; //trubky se posouvají doleva rychlostí
let velocityY = 0; // rychlost skákání flappyho
let gravity = 0.4; //gravitace flappyho
let score = 0;

//gameover
let gameOver = false;

window.onload = function (){
    playboard = document.getElementById("playboard");
    playboard.height = playboardHeight;
    playboard.width = playboardWidth;
    context = playboard.getContext("2d"); //pro kreslení

    //context flappy urceni mista,zobrazeni pro nasledujici kod flappy img
    //context.fillStyle = "green";
    //context.fillRect(flappy.x, flappy.y, flappy.width, flappy.height);

    //flappy img
    flappyImg = new Image();
    flappyImg.src = "./resources/images/flappybird.png";
    flappyImg.onload = function(){
        context.drawImage(flappyImg, flappy.x, flappy.y, flappy.width, flappy.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./resources/images/toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./resources/images/bottompipe.png";


    requestAnimationFrame(update);
    setInterval(placePipes, 1500); // 1.5sekundy
    document.addEventListener("keydown", moveBird);

}
//update function - nejdulezitejsi funkce, na ktere hra funguje
function update () {
    requestAnimationFrame(update);
    if (gameOver) {
        return; 
    }
    context.clearRect(0, 0, playboard.width, playboard.height);

    //flappy
    velocityY += gravity;
    //flappy.y += velocityY;
    flappy.y = Math.max(flappy.y + velocityY, 0); // make sure to not go higher that the screen
    context.drawImage(flappyImg, flappy.x, flappy.y, flappy.width, flappy.height);

    if (flappy.y > playboard.height) {
        gameOver = true;
    }

    //pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && flappy.x > pipe.x + pipe.width) {
            score += 0.5; //protoze jsou2 pipes, takze kdyz by zustalo +=1,tak se budou body pricitat po 2
            pipe.passed = true;
        }

        if (detectCollision(flappy, pipe)) {
            gameOver = true;
        }
    }

    //clear the pipes that went "left" out of the screen (memory zatizeni), -pipe.width znamena, ze pipe zmizi s "pravym" rohem trubky takže jakoby "hezky"
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift(); //odstrani prvni element 
    }

    //score
    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(score, 5, 45);

    //text po skonceni hry
    if (gameOver) {
        context.fillText("GAME OVER", 40, 320);
        context.fillText("Press X to", 80, 380);
        context.fillText("continue", 100, 420);
    }
}

function placePipes () {
    if (gameOver) {
        return;
    }
    //pipeArray.push(new Pipe(pipeX, pipeY, pipeWidth, pipeHeight, topPipeImg, bottomPipeImg));

    // (0-1) * pipeHeigth/2
    // 0 -> -128 (=pipeHeight/4 = 512/4)
    // 1 -> -128 - 256 (pipeHeight/4 - pipeHeight/2 = 3/4) = range posunuti trubky muze byt od 1/4 do 3/4 smerem nahoru
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = playboard.height/4;

    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(topPipe);


    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(bottomPipe);

}
function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
        velocityY = -6; //jumping

        //reset the game
        if (gameOver) {
            flappy.y = flappyY;
            pipeArray = [];
            score = 0;
            gameOver = false;
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}
