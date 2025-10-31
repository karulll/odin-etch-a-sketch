// start 
const canvas = document.querySelector(".canvas");
const inputGridValue = document.getElementById("grid-size");
const gridValue = document.getElementById("grid-value"); 
const colorMode = document.getElementById("color-mode"); 
const pickerMode = document.getElementById("picker-mode"); 
const rainbowMode = document.getElementById("rainbow-mode"); 
const shadingMode = document.getElementById("shading-mode"); 
const borderToggle = document.getElementById("border-toggle"); 
const clearCanvas = document.getElementById("clear-canvas"); 
let currentActive = 0;

let size = 16;
createGridCells(size);

colorMode.addEventListener("click", ()=> setActiveMode(colorMode.value));
pickerMode.addEventListener("click", ()=> setActiveMode(pickerMode.value));
rainbowMode.addEventListener("click", ()=> setActiveMode(rainbowMode.value));
shadingMode.addEventListener("click", ()=> setActiveMode(shadingMode.value));
borderToggle.addEventListener("click", ()=> setActiveMode(borderToggle.value));
clearCanvas.addEventListener("click", ()=> setActiveMode(clearCanvas.value));

inputGridValue.addEventListener("input", setGridValue);

function createGridCells(size) {
    document.querySelectorAll('.cell').forEach(e => e.remove());
    for(let i = 1; i <= size * size; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.id = `${i}`;
        canvas.appendChild(cell);
        console.log(i);
    }
}

function setGridValue(size) {
    size = Math.round(Number(inputGridValue.value));
    gridValue.textContent = size + "x" + size;

    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    createGridCells(size);
}

function setActiveMode(value) {
    if(value != 6) {
        [   colorMode, pickerMode, 
            rainbowMode, shadingMode, 
            borderToggle, clearCanvas
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
            borderToggle.classList.add("active");
            break;
        case 6:
            console.log("clear");
            break;
    }
    console.log(value);
}