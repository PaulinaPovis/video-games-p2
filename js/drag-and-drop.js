const draggableElement = document.querySelector('#draggableElement');

draggableElement.addEventListener("dragstart", e =>{
    e.dataTransfer.setData("text/plain", draggableElement.id);
    
});

for (const dropZone of document.querySelectorAll(".dropzone")){
    dropZone.addEventListener("dragover", e=> {
        e.preventDefault();
        dropZone.classList.add("dropzone-over");
    })
    dropZone.addEventListener("dragleave", e=>{
        dropZone.classList.remove("dropzone-over");
    })
    dropZone.addEventListener("drop", e =>{
        e.preventDefault();
        const droppedElementId = e.dataTransfer.getData("text/plain");
        const droppedElement = document.getElementById(droppedElementId);
        dropZone.appendChild(droppedElement);
        dropZone.classList.remove("dropzone-over");
    })
}