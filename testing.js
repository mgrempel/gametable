window.addEventListener("DOMContentLoaded", () => {
  const piece = document.getElementById("piece-1");
  const piece2 = document.getElementById("piece-2");
  piece.ondragstart = handleDragStart;
  piece.ondragend = handleDragEnd;

  piece2.ondragstart = handleDragStart;
  piece2.ondragend = handleDragEnd;
});

function handleDragStart(e) {
  const pieceId = e.target.id;
  const left = Number(e.target.style.left.replace("px", ""));
  const top = Number(e.target.style.top.replace("px", ""));
  const mouseX = e.clientX - left;
  const mouseY = e.clientY - top;

  e.dataTransfer.setData("text/plain", `${pieceId},${mouseX},${mouseY}`);
}

function handleDragEnd(e) {
  const dataString = e.dataTransfer.getData("text/plain");
  const [id, mouseXString, mouseYString] = dataString.split(",");
  const mouseX = Number(mouseXString),
    mouseY = Number(mouseYString);

  const elem = document.getElementById(id);

  elem.style.left = `${e.clientX - mouseX}px`;
  elem.style.top = `${e.clientY - mouseY}px`;

  console.log(id);
}
