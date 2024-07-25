const colors = {
    "Red": "#ff5050",
    "Yellow": "#ffff00",
    "Spring Green": "#00ff7f",
    "Steel Blue": "#4682b4",
    "Wheat": "#f5deb3",
    "Thistle": "#d8bfd8",
    "Slate Blue": "#6a5acd",
    "Sky Blue": "#87ceeb",
    "Sea Green": "#2e8b57",
    "Sandy Brown": "#f4a460",
    "Salmon": "#fa8072",
    "Plum": "#dda0dd",
    "Pink": "#ffc0cb",
    "Pale Violet Red": "#db7093",
    "Pale Green": "#98fb98",
    "Lavender": "#e6e6fa",
    "Dodger Blue": "#1e90ff",
    "Gold": "#ffd700",
    "Orange": "#ffa500",
};

let colorTypes = document.querySelectorAll("header button");
let colorType = "colorName";

colorTypes.forEach((item) => {
    item.addEventListener("click", () => {
        colorType = item.className;

        let oldColorText = document.querySelector("#color-title span").innerHTML;
        if (oldColorText === "White" && colorType !== "colorName") {
            document.querySelector("#color-title span").innerHTML = "#ffffff";
        }
        else if (oldColorText === "#ffffff" && colorType === "colorName") {
            document.querySelector("#color-title span").innerHTML = "White";
        }
        else if (!oldColorText.startsWith("#")) {
            setColorText(oldColorText);
        }
        else {
            for (let color of Object.keys(colors)) {
                if (colors[color] === oldColorText) {
                    setColorText(color);
                    break;
                }
            }
        }

        for (let type of colorTypes) {
            if (type.className == colorType) {
                type.style.color = "rgb(100, 180, 255)";
            }
            else {
                type.style.color = "white";
            }
        }
    });
});

let colorPicker = document.querySelector(".colorPicker input[type='color']");
colorPicker.addEventListener("input", () => {
    document.querySelector("body").style.backgroundColor = colorPicker.value;
    document.querySelector("#color-title span").innerHTML = colorPicker.value;
});

function changeColor() {
    const colorNames = Object.keys(colors);
    let colorName = colorNames[Math.floor(Math.random()*colorNames.length)];
    document.querySelector("body").style.backgroundColor = colors[colorName];
    setColorText(colorName);
    colorPicker.value = colors[colorName];
}

function setColorText(colorName) {
    if (colorType === "colorName") {
        document.querySelector("#color-title span").innerHTML = colorName;
    }
    else {
        let colorCode = colors[colorName];
        document.querySelector("#color-title span").innerHTML = colorCode;
    }
}

