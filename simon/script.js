// Incomplete -> not well designed.

const btns = document.querySelectorAll(".btn");
const h1 = document.querySelector("h1");
const compOrder = [];
const userOrder = [];
let correctClicks = 0;
let level = 0;
let started = false;


btns.forEach(btn => {
    btn.addEventListener("click", () => {
        clickBtn(btn);
        userOrder.push(btn);
    });
});


function clickBtn(btn) {
    btn.classList.add("clicked");
    setTimeout(() => btn.classList.remove("clicked"), 100);
    if (btn.classList.contains("green-btn")) {
        new Audio("sounds/green.mp3").play();
    }
    else if (btn.classList.contains("red-btn")) {
        new Audio("sounds/red.mp3").play();
    }
    else if (btn.classList.contains("yellow-btn")) {
        new Audio("sounds/yellow.mp3").play();
    }
    else {
        new Audio("sounds/blue.mp3").play();
    }
    if (h1.innerHTML.startsWith("Game Over")) {
        new Audio("sounds/wrong.mp3").play();
        document.body.classList.add("wrong");
        setTimeout(() => document.body.classList.remove("wrong"), 300);
    }
}

function compPattern(n) {
    compOrder.length = 0;
    let randBtnIndex;
    let timeDelay = 500;
    for (let i=0; i<n; i++) {
        setTimeout(() => {
            randBtnIndex = Math.floor(Math.random()*btns.length);
            clickBtn(btns[randBtnIndex]);
            compOrder.push(btns[randBtnIndex]);
            if (i==n-1) {
                userOrder.length = 0;
                correctClicks = 0;
                for (let i=0; i<n; i++) {
                    checkUserOrder();
                }
            }
        }, i * timeDelay);
    }
}

function checkUserOrder() {
    if (!userOrder.length) {
        setTimeout(() => checkUserOrder(), 300);
    }
    else if (userOrder[0] === compOrder[0]) {
        userOrder.shift();
        compOrder.shift();
        correctClicks++;
    }
    else if (compOrder.length && h1.innerHTML.startsWith("Level")) {
        h1.innerHTML = "Game Over, Press Any Key to Restart";
        started = false;
        level = 0;
        new Audio("sounds/wrong.mp3").play();
        document.body.classList.add("wrong");
        setTimeout(() => document.body.classList.remove("wrong"), 300);
    }

    if (!compOrder.length && correctClicks === level) {
        level++;
        console.log(10);
        playLevel(level);
    }
}

function playLevel(n) {
    h1.innerHTML = "Level " + n;
    setTimeout(() => {
        compPattern(n);
        // for (let i=0; i<n; i++) {
        //     if (!checkUserOrder()) {
        //         break;
        //     }
        // }
    }, 800);
}


document.addEventListener("keypress", () => {
    if (!started) {
        level++;
        playLevel(level);
        started = true;
    }
});

