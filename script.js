// canvas
const canvas = document.querySelector(".canvas");
const inputGridValue = document.getElementById("grid-size");
const gridValue = document.getElementById("grid-value"); 
const color = document.getElementById("color");

// buttons
const colorMode = document.getElementById("color-mode"); 
const eraserMode = document.getElementById("eraser-mode"); 
const rainbowMode = document.getElementById("rainbow-mode"); 
const pickerMode = document.getElementById("picker-mode"); 
const borderToggle = document.getElementById("border-toggle"); 
const clearCanvas = document.getElementById("clear-canvas"); 

let defaultSize = 32;
let mouseIsDown = false;

createGridCells(defaultSize);

document.body.onmouseup = () => mouseIsDown = false;

function createGridCells(size) {
    document.querySelectorAll('.cell').forEach(e => e.remove());

    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for(let i = 1; i <= size * size; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        canvas.appendChild(cell);
        cell.style.backgroundColor = "#ffffff";
        cell.addEventListener("mouseover", () => setCellColor(cell, mouseIsDown));
        cell.addEventListener("mousedown", () => {mouseIsDown = true; setCellColor(cell, mouseIsDown)});
    }

    const cells = document.getElementsByClassName("cell");
    if (borderToggle.classList.contains("active")) {
            Array.from(cells).forEach(e => e.style.borderStyle = "solid");
    } else {
            Array.from(cells).forEach(e => e.style.borderStyle = "none");
    }
}

function setCellColor(cell, isMouseDown) {
    if(isMouseDown) {

        if(pickerMode.classList.contains("active")) {
            let cellRGB = cell.style.backgroundColor.slice(4).replace(/,/g, "").replace(")", "").split(" ", 3);
            color.value = "#" + ((1 << 24) + (parseInt(cellRGB[0]) << 16) + (parseInt(cellRGB[1]) << 8) + parseInt(cellRGB[2])).toString(16).slice(1);
        }

        if(colorMode.classList.contains("active")) {
            cell.style.backgroundColor = color.value;
        } else if(eraserMode.classList.contains("active")) {
            cell.style.backgroundColor = "#ffffff";
        } else if(rainbowMode.classList.contains("active")) {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            const rainbowColor = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            cell.style.backgroundColor = rainbowColor;
        }
    }
}

inputGridValue.addEventListener("input", setGridDisplay);

inputGridValue.addEventListener("change", setGridValue);

function setGridDisplay() {
    const size = Math.round(Number(inputGridValue.value));
    gridValue.textContent = size + "x" + size;
}

function setGridValue() {
    const size = Math.round(Number(inputGridValue.value));
    createGridCells(size);
}

// button listeners

colorMode.addEventListener("click", () => setActiveMode(colorMode.value));
eraserMode.addEventListener("click", () => setActiveMode(eraserMode.value));
rainbowMode.addEventListener("click", () => setActiveMode(rainbowMode.value));
pickerMode.addEventListener("click", () => setActiveMode(pickerMode.value));
borderToggle.addEventListener("click", () => setActiveMode(borderToggle.value));
clearCanvas.addEventListener("click", () => setActiveMode(clearCanvas.value));


function setActiveMode(value) {
    if(value < 5) {
        [   colorMode, eraserMode, 
            rainbowMode, pickerMode,
            clearCanvas
        ].forEach(e => e.classList.remove("active"));
    }
    
    switch (value) {
        case "1":
            colorMode.classList.add("active");
            break;
        case "2":
            eraserMode.classList.add("active");
            break;
        case "3":
            rainbowMode.classList.add("active");
            break;
        case "4":
            pickerMode.classList.add("active");
            break;
        case "5":
            const cells = document.getElementsByClassName("cell");
            if (borderToggle.classList.contains("active")) {
                borderToggle.classList.remove("active");
                Array.from(cells).forEach(e => e.style.borderStyle = "none");
            } else {
                borderToggle.classList.add("active");
                Array.from(cells).forEach(e => e.style.borderStyle = "solid");
            }
            break;
        default: // clear
            const clearCells = document.getElementsByClassName("cell");
            Array.from(clearCells).forEach(e => e.style.backgroundColor = "#ffffffff");
            break;
    }
}