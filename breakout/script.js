const container = document.querySelector(".container");
const bricksGrid = document.querySelector(".grid.bricks");
const ball = document.querySelector(".ball");
const base = document.querySelector(".base");
const centerText = document.querySelector(".center-text");
const scoreText = document.querySelector(".score");
let started = false;
let score = 0;
let changeX = 7;
let changeY = 7;

const bricks = [];

function addbricks(n) {
    for (let i = 0; i < n; i++) {
        let brick = document.createElement("div");
        bricksGrid.appendChild(brick);
        bricks.push(brick);
    }
}

addbricks(20);

document.addEventListener("keydown", (e) => {
    if (!started) {
        started = true;
        centerText.innerHTML = "";
    }
    let oldLeft = base.style.left ? parseFloat(base.style.left) : 0;
    let moveLength = 70;
    if (e.key === "ArrowRight") {
        if (oldLeft + base.offsetWidth + moveLength > bricksGrid.offsetWidth) {
            base.style.left = bricksGrid.offsetWidth - base.offsetWidth + "px";
        }
        else {
            base.style.left = oldLeft + moveLength + "px";
        }
    }
    else if (e.key === "ArrowLeft") {
        if (oldLeft - moveLength < 0) {
            base.style.left = 0;
        }
        else {
            base.style.left = oldLeft - moveLength + "px";
        }
    }
});

function isCollide(obj1, obj2) {
    let obj1X = obj1.offsetLeft;
    let obj2X = obj2.offsetLeft;
    let obj1Y = obj1.offsetTop;
    let obj2Y = obj2.offsetTop;
    let obj1Height = obj1.offsetHeight;
    let obj2Height = obj2.offsetHeight;
    let obj1Width = obj1.offsetWidth;
    let obj2Width = obj2.offsetWidth;
    return (obj2X + obj2Width > obj1X && obj2X < obj1X + obj1Width && obj2Y + obj2Height > obj1Y && obj2Y < obj1Y + obj1Height);
}

function moveBall() {
    if (changeX) {
        if (ball.offsetLeft + changeX < 0) {
            changeX *= -1;
        }
        else if (ball.offsetLeft + ball.offsetWidth + changeX > bricksGrid.offsetWidth + 2*bricksGrid.offsetLeft) {
            changeX *= -1;
        }
        let oldLeft = parseFloat(ball.style.left || getComputedStyle(ball).left);
        ball.style.left = oldLeft + changeX + "px";
    }
    if (changeY) {
        if (ball.offsetTop - changeY < 0) {
            changeY *= -1;
        }
        else if (ball.offsetTop > container.offsetHeight) {
            changeX = 0;
            changeY = 0;
            centerText.innerHTML = "You Lose!...";
            alert(`Sorry, you lose. You got ${score} scores!...`);
            clearInterval(gameLoop);
        }
        let oldBottom = parseFloat(ball.style.bottom || getComputedStyle(ball).bottom);
        ball.style.bottom = oldBottom + changeY + "px";
    }
}

let gameLoop = setInterval(() => {
    if (started) {
        moveBall();
        if (!bricks.length) {
            centerText.innerHTML = "You Won!...";
            alert(`Wow! You won. You got ${score} scores!...`);
            clearInterval(gameLoop);
        }
        else {
            if (ball.offsetTop < 300) {
                for (let brick of bricks) {
                    if (isCollide(brick, ball)) {
                        if (ball.offsetLeft + ball.offsetWidth/2 < brick.offsetLeft || 
                            ball.offsetLeft + ball.offsetWidth/2 > brick.offsetLeft + brick.offsetWidth) {
                            changeX *= -1;
                        }
                        else if (ball.offsetTop + ball.offsetHeight/2 < brick.offsetTop || 
                            ball.offsetTop + ball.offsetHeight/2 > brick.offsetTop + brick.offsetHeight) {
                            changeY *= -1;
                        }
                        brick.classList.add("hide");
                        bricks.splice(bricks.indexOf(brick), 1);
                        score++;
                        scoreText.innerHTML = score;
                    }
                }
            }
            if (isCollide(base, ball)) {
                if (ball.offsetLeft + ball.offsetWidth*3/4 < base.offsetLeft || 
                    ball.offsetLeft + ball.offsetWidth/4 > base.offsetLeft + base.offsetWidth) {
                    changeX *= -1;
                }
                else if (ball.offsetTop + ball.offsetHeight*3/4 < base.offsetTop || 
                    ball.offsetTop + ball.offsetHeight/4 > base.offsetTop + base.offsetHeight) {
                    changeY *= -1;
                }
            }
        }
    }
}, 50);

