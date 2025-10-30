// start 
const canvas = document.querySelector(".canvas");
const inputGridValue = document.getElementById("grid-size");
const gridValue = document.getElementById("grid-value"); 

let size = 16;

createGridCells(size);

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