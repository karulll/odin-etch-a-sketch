// start 
const canvas = document.querySelector(".canvas");
const inputGridValue = document.getElementById("grid-size");
const gridValue = document.getElementById("grid-value"); 

inputGridValue.addEventListener("input", setCanvasSize);

function setCanvasSize(size){
    size = Math.round(Number(inputGridValue.value));
    gridValue.textContent = size + "x" + size;

    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    
}