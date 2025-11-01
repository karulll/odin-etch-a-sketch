// canvas
const canvas = document.querySelector(".canvas");
const inputGridValue = document.getElementById("grid-size");
const gridValue = document.getElementById("grid-value"); 
const color = document.getElementById("color");
const cell = document.getElementsByClassName("cell");

// buttons
const colorMode = document.getElementById("color-mode"); 
const eraserMode = document.getElementById("eraser-mode"); 
const rainbowMode = document.getElementById("rainbow-mode"); 
const shadingMode = document.getElementById("shading-mode"); 
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
        cell.id = `${i}`;
        canvas.appendChild(cell);
        cell.addEventListener("mouseover", () => setCellColor(cell, mouseIsDown));
        cell.addEventListener("mousedown", () => {mouseIsDown = true; setCellColor(cell, mouseIsDown)});
    }

    if (borderToggle.classList.contains("active")) {
            Array.from(cell).forEach(e => e.style.borderStyle = "solid");
    } else {
            Array.from(cell).forEach(e => e.style.borderStyle = "none");
    }
}

function setCellColor(cell, isMouseDown) {
    console.log(isMouseDown);
    if(isMouseDown) {
        const colorPicked = color.value;
        if(colorMode.classList.contains("active")) {
            cell.style.backgroundColor = colorPicked;
        } else if(eraserMode.classList.contains("active")) {
            cell.style.backgroundColor = "var(--bg-light)";
        }

    }
}

inputGridValue.addEventListener("input", setGridValue);

function setGridValue(size) {
    size = Math.round(Number(inputGridValue.value));
    gridValue.textContent = size + "x" + size;

    createGridCells(size);
}


// button listeners
let currentActive = 0;

colorMode.addEventListener("click", () => setActiveMode(colorMode.value));
eraserMode.addEventListener("click", () => setActiveMode(eraserMode.value));
rainbowMode.addEventListener("click", () => setActiveMode(rainbowMode.value));
shadingMode.addEventListener("click", () => setActiveMode(shadingMode.value));
borderToggle.addEventListener("click", () => setActiveMode(borderToggle.value));
clearCanvas.addEventListener("click", () => setActiveMode(clearCanvas.value));


function setActiveMode(value) {
    if(value < 5) {
        [   colorMode, eraserMode, 
            rainbowMode, shadingMode,
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
            shadingMode.classList.add("active");
            break;
        case "5":
            if (borderToggle.classList.contains("active")) {
                borderToggle.classList.remove("active");
                Array.from(cell).forEach(e => e.style.borderStyle = "none");
            } else {
                borderToggle.classList.add("active");
                Array.from(cell).forEach(e => e.style.borderStyle = "solid");
            }
            break;
        default: // clear
                Array.from(cell).forEach(e => e.style.backgroundColor = "var(--bg-light)");
            break;
    }
}