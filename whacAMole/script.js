const scoreText = document.querySelector(".score");
const timeText = document.querySelector(".time-left");
const flexbox = document.querySelector(".grid");

timeText.innerHTML = 60;

function checkHit() {
    if (this.classList.contains("show")) {
        scoreText.innerHTML = scoreText.innerHTML*1 + 1;
    }
}

for (let i = 0; i < 15; i++) {
    let box = document.createElement("div");
    box.addEventListener("click", checkHit);
    flexbox.appendChild(box);
}

const boxes = flexbox.childNodes;

let position = 0;
let positionChanger = setInterval(() => {
    boxes[position].classList.remove("show");
    position = Math.floor(Math.random()*boxes.length);
    boxes[position].classList.add("show");
}, 1000);

let timeChanger = setInterval(() => {
    if (timeText.innerHTML <= 0) {
        boxes.forEach((el) => {
            el.removeEventListener("click", checkHit);
        });
        clearInterval(positionChanger);
        clearInterval(timeChanger);
    }
    else {
        timeText.innerHTML--;
    }
}, 1000);
