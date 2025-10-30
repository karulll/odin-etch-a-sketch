const canvas = document.getElementsByClassName("canvas");
const inputGridValue = document.getElementById("grid-size");
const gridValue = document.getElementById("grid-value"); 

inputGridValue.addEventListener("input", setCanvasSize);

function setCanvasSize(size){
    size = Math.round(Number(inputGridValue.value));
    gridValue.textContent = size + "x" + size;

    
}