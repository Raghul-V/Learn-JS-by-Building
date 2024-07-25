const grid = document.querySelector(".grid");

for (let i = 0; i < 12; i++) {
    let box = document.createElement("div");
    box.setAttribute("data-id", i);
    grid.appendChild(box);
}

const boxes = grid.childNodes;
const hiddenBgs = [];
let score = 0;


// // Method 1: START
// while (hiddenBgs.length < boxes.length) {
//     for (let i of ["red-bg", "cyan-bg", "blue-bg", "gray-bg", "green-bg", "violet-bg"]) {
//         for (let j = 0; j < 2; j++) {
//             hiddenBgs.splice(Math.floor(Math.random()*(hiddenBgs.length+1)), 0, i);
//         }
//         if (hiddenBgs.length >= boxes.length) break;
//     }
// }
// // Method 1: END

// // Method 2: START
while (hiddenBgs.length < boxes.length) {
    for (let i of ["red-bg", "cyan-bg", "blue-bg", "gray-bg", "green-bg", "violet-bg"]) {
        for (let j = 0; j < 2; j++) {
            hiddenBgs.push(i);
        }
        if (hiddenBgs.length >= boxes.length) break;
    }
}
hiddenBgs.sort(() => 0.5 - Math.random());
// // Method 2: END


const revealed = [];
boxes.forEach((el) => {
    el.addEventListener("click", () => {
        if (!revealed.includes(el)) {
            score -= .5;
            el.classList.add(hiddenBgs[el.getAttribute("data-id")]);
            revealed.push(el);
        }
        if (revealed.length >= 2) {
            setTimeout(() => {
                let elem1Bg = hiddenBgs[revealed[0].getAttribute("data-id")];
                let elem2Bg = hiddenBgs[revealed[1].getAttribute("data-id")];
                if (elem1Bg === elem2Bg) {
                    revealed[0].classList.add("hide");
                    revealed[1].classList.add("hide");
                    score += 6;
                }
                else {
                    revealed[0].classList = [];
                    revealed[1].classList = [];
                }
                revealed.length = 0;
                document.querySelector(".score").innerHTML = score;
            }, 500);
        }
    });
});
