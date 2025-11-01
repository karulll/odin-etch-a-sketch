// canvas
const canvas = document.querySelector(".canvas");
const inputGridValue = document.getElementById("grid-size");
const gridValue = document.getElementById("grid-value"); 
const color = document.getElementById("color");
const cell = document.getElementsByClassName("cell");

let size = 16;
let mouseIsDown = false;

createGridCells(size);

canvas.onmousedown = () => mouseIsDown = true;
canvas.onmouseup = () => mouseIsDown = false;

function createGridCells(size) {
    document.querySelectorAll('.cell').forEach(e => e.remove());
    for(let i = 1; i <= size * size; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.id = `${i}`;
        canvas.appendChild(cell);
        console.log(i);
        cell.addEventListener("mouseover", () => setCellColor(cell, mouseIsDown));
        cell.addEventListener("mousedown", () => setCellColor(cell, mouseIsDown));
    }
}

function setCellColor(cell, isMouseDown) {
    console.log(isMouseDown);
    if(isMouseDown) {
        cell.style.backgroundColor = "red";
    }
}

inputGridValue.addEventListener("input", setGridValue);

function setGridValue(size) {
    size = Math.round(Number(inputGridValue.value));
    gridValue.textContent = size + "x" + size;

    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    createGridCells(size);
}


// buttons
const colorMode = document.getElementById("color-mode"); 
const pickerMode = document.getElementById("picker-mode"); 
const rainbowMode = document.getElementById("rainbow-mode"); 
const shadingMode = document.getElementById("shading-mode"); 
const borderToggle = document.getElementById("border-toggle"); 
const clearCanvas = document.getElementById("clear-canvas"); 
let currentActive = 0;

colorMode.addEventListener("click", () => setActiveMode(colorMode.value));
pickerMode.addEventListener("click", () => setActiveMode(pickerMode.value));
rainbowMode.addEventListener("click", () => setActiveMode(rainbowMode.value));
shadingMode.addEventListener("click", () => setActiveMode(shadingMode.value));
borderToggle.addEventListener("click", () => setActiveMode(borderToggle.value));
clearCanvas.addEventListener("click", () => setActiveMode(clearCanvas.value));


function setActiveMode(value) {
    if(value < 5) {
        [   colorMode, pickerMode, 
            rainbowMode, shadingMode,
            clearCanvas
        ].forEach(e => e.classList.remove("active"));
    }
    
    switch (value) {
        case "1":
            colorMode.classList.add("active");
            break;
        case "2":
            pickerMode.classList.add("active");
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
            } else {
                borderToggle.classList.add("active");
            }
            break;
        case 6:
            console.log("clear");
            break;
    }
    console.log(value);
}