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

        let row = Math.floor(Math.random() * maze.length);
        let column = Math.floor(Math.random() * maze[row].length);

        for (let row of maze) {
            for (let column of maze) {
                let random = Math.floor(Math.random() * 2);
                let randomM = Math.floor(Math.random() * 10);
                maze[row[x]][column[x]] = random;
                maze[1][1] = 2
             }
         }

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


setInterval(function () {
    const position = player.getBoundingClientRect();
    if (downPressed) {
        const position = player.getBoundingClientRect();
        //playerTop++;
        let newBottom = position.bottom + 1;

        let btmL = document.elementFromPoint(position.left, newBottom);
        let btmR = document.elementFromPoint(position.right, newBottom);

        if (btmL.classList.contains('wall') == false && btmR.classList.contains('wall') == false) {
            playerTop++;
            player.style.top = playerTop + 'px';

        }
        playerMouth.classList = 'down';

        pointCheck();
    }
    else if (upPressed) {
        const position = player.getBoundingClientRect();
        //playerTop--;
        let newTop = position.top - 1;
        let topL = document.elementFromPoint(position.left, newTop);
        let topR = document.elementFromPoint(position.right, newTop);

        if (topL.classList.contains('wall') == false && topR.classList.contains('wall') == false) {
            playerTop--;
            player.style.top = playerTop + 'px';
        }
        playerMouth.classList = 'up';
        pointCheck();
    }
    else if (leftPressed) {
        const position = player.getBoundingClientRect();
        //playerLeft--;
        let newLeft = position.left - 1;
        let topL = document.elementFromPoint(newLeft, position.top);
        let btmR = document.elementFromPoint(newLeft, position.bottom);

        if (topL.classList.contains('wall') == false && btmR.classList.contains('wall') == false) {
            playerLeft--;
            player.style.left = playerLeft + 'px'

        }
        playerMouth.classList = 'left';
        pointCheck();
    }
    else if (rightPressed) {
        const position = player.getBoundingClientRect();
        //playerLeft++;
        let newRight = position.right + 1;
        let topR = document.elementFromPoint(newRight, position.top);
        let btmR = document.elementFromPoint(newRight, position.bottom);

        if (topR.classList.contains('wall') == false && btmR.classList.contains('wall') == false) {
            playerLeft++;
            player.style.left = playerLeft + 'px';
        }
        playerMouth.classList = 'right';
        pointCheck();
    }
}, 10);

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

const START = document.querySelector("#startBtn");

function startGame() {



    START.style.display = "none";

    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);


}

START.addEventListener("click", startGame);




function pointCheck() {
    const position = player.getBoundingClientRect();
    const points = document.querySelectorAll('.point');
    for (let i = 0; i < points.length; i++) {
        let pos = points[i].getBoundingClientRect();
        if (
            position.right > pos.left &&
            position.left < pos.right &&
            position.bottom > pos.top &&
            position.top < pos.bottom
        ) {
            points[i].classList.remove('point');
        }
    }
}


function createLives() {
    const li = document.createElement("li");
    const ul = document.querySelector(".lives ul");
    ul.appendChild(li);
}
createLives();
createLives();
createLives();

function removeLives() {
    const li = document.querySelector(".lives ul li");
    li.parentNode.removeChild(li);
}

//removeLives();




