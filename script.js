let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

const main = document.querySelector('main');

//Player = 2, Wall = 1, Enemy = 3, Point = 0
let maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 1, 0, 0, 0, 0, 3, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 3, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

function generateEnemy() {
    let row = Math.floor(Math.random() * maze.length);
    let column = Math.floor(Math.random() * maze[row].length);

    if (maze[row][column] == 0) {
        maze[row][column] = 3;
    }
    else {
        generateEnemy();
    }
}

generateEnemy();
generateEnemy();
generateEnemy();
generateEnemy();


//Populates the maze in the HTML
for (let y of maze) {
    for (let x of y) {
        let block = document.createElement('div');
        block.classList.add('block');

        switch (x) {
            case 1:
                block.classList.add('wall');
                break;
            case 2:
                block.id = 'player';
                let mouth = document.createElement('div');
                mouth.classList.add('mouth');
                block.appendChild(mouth);
                break;
            case 3:
                block.classList.add('enemy');
                break;
            default:
                block.classList.add('point');
                block.style.height = '1vh';
                block.style.width = '1vh';
        }

        main.appendChild(block);

        // let row = Math.floor(Math.random() * maze.length);
        // let column = Math.floor(Math.random() * maze[row].length);

        // for (let row of maze) {
        //     for (let column of maze) {
        //         let random = Math.floor(Math.random() * 2);
        //         let randomM = Math.floor(Math.random() * 10);
        //         maze[row[x]][column[x]] = random;
        //         maze[1][1] = 2
        //      }
        //  }

        ///////

        //  for (let i = 0; i < 5; i++) {
        //     console.log(i)
        //   }
          

       
        // for (let value of maze) {
        //     let rowW = Math.floor(Math.random() * maze.length);
        //     let columnW = Math.floor(Math.random() * maze[rowW].length);
            
        // if (maze[rowW][columnW] == 0) {
        //     maze[rowW][columnW] = 1;
        // }
        // else {
        //     continue;
        // }
        

        //     maze[1][1] = 2
        // }
        
        
    }
}

//Player movement
function keyUp(event) {
    if (event.key === 'ArrowUp') {
        upPressed = false;
    } else if (event.key === 'ArrowDown') {
        downPressed = false;
    } else if (event.key === 'ArrowLeft') {
        leftPressed = false;
    } else if (event.key === 'ArrowRight') {
        rightPressed = false;
    }
}

function keyDown(event) {
    if (event.key === 'ArrowUp') {
        upPressed = true;
    } else if (event.key === 'ArrowDown') {
        downPressed = true;
    } else if (event.key === 'ArrowLeft') {
        leftPressed = true;
    } else if (event.key === 'ArrowRight') {
        rightPressed = true;
    }
}

const player = document.querySelector('#player');
const playerMouth = player.querySelector('.mouth');
let playerTop = 0;
let playerLeft = 0;


let timer = setInterval(function () {

    pointCheck();
    //enemyCheck();
    console.log(enemyCheck());
    const playerPosition = player.getBoundingClientRect();
    let position = {
        left: playerPosition.left,
        right: playerPosition.right,
        top: playerPosition.top,
        bottom: playerPosition.bottom
    }

    if (downPressed) {
        position.bottom++;
        if(!collision(position,"wall")){
            playerTop++;
            player.style.top = playerTop + "px";
        }
        playerMouth.classList = "down";
    }

    if (upPressed) {
        position.top--;
        if(!collision(position,"wall")){
            playerTop--;
            player.style.top = playerTop + "px";
        }
        playerMouth.classList = "up";
    }
    if (leftPressed) {
        position.left--;
        if(!collision(position,"wall")){
            playerLeft--;
            player.style.left = playerLeft + "px";
        }
        playerMouth.classList = "left";
    }
    if (rightPressed) {
        position.right++;
        if(!collision(position,"wall")){
            playerLeft++;
            player.style.left = playerLeft + "px";
        }
        playerMouth.classList = "right";
    }

    
}, 1);

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

const START = document.querySelector("#startBtn");

function startGame() {



    START.style.display = "none";

    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);


}

START.addEventListener("click", startGame);


let score = 0;

function pointCheck() {
    const position = player.getBoundingClientRect();

    const check = collision(position,'point');

    if (check != false){
        check.classList.remove('point');
        score++;
        //check this line 
        const scoreP = document.querySelector('.score p')
        scoreP.firstChild.nodeValue = score;
    }

    const points = document.querySelectorAll('.point');
    if(points.length <= 0){
        clearInterval(timer);
        gameOver();
    }
}

function collision(position,clss) {
    const elements = document.querySelectorAll(`.${clss}`)
    for(let i = 0; i < elements.length; i++){
        let pos = elements[i].getBoundingClientRect();
        if(
            position.right > pos.left &&
            position.left < pos.right &&
            position.bottom > pos.top &&
            position.top < pos.bottom
        ){
            return elements[i];
        }
    }
    return false;
}

function enemyCheck() {
    const position = player.getBoundingClientRect();
    const check = collision(position,"enemy");
    let counter = 0
    if(check != false){
        return true;
    }
    else{
        return false;
    }

    // if(check !=false){
    //     while (check == true){
    //         console.log("in contact")
    //     }
    //     counter++;
    //     if(counter == 3){
    //         gameOver();
    //     }
    //     else{
    //         //removeLives();
    //     }
    // }
}

function gameOver() {
    console.log("game over")
    clearInterval(timer);
}


function createLives() {
    const li = document.createElement("li");
    const ul = document.querySelector(".lives ul");
    ul.appendChild(li);
}
createLives();
createLives();
createLives();

// function removeLives() {
//     const li = document.getElementById('livesC')
//     li.parentNode.removeChild(li);
   
// }

//removeLives();




