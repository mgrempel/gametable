document.addEventListener("DOMContentLoaded", () => {
  //Add pieces to drawer.

  const drawer = document.getElementById("drawer");

  const piece = new Piece(0, 0, false, true).node;
  piece.onmousedown = (e) => {
    console.log("hit");
    const newPiece = new Piece(0, 0, false);
    document.getElementById("board").appendChild(newPiece.node);
    newPiece.startDrag(e);
  };

  drawer.appendChild(piece);
});

function addPiece() {
  const node = new Piece(100, 0, true);
  document.getElementById("board").appendChild(node.node);
}

class Piece {
  constructor(x, y, isStatic = false) {
    this.x = x;
    this.y = y;

    this.node = document.createElement("div");
    this.node.style.width = "50px";
    this.node.style.height = "50px";
    this.node.style.backgroundColor = "black";
    this.node.draggable = false;

    this.isStatic = isStatic;
    if (!isStatic) {
      this.node.style.position = "absolute";
      this.#initDrag(this.node);
      this.#move(this.x, this.y);
    }
  }

  #initDrag = (node) => {
    node.onmousedown = (e) => this.startDrag(e);

    node.onmouseup = () => {
      document.onmousemove = null;
    };
  };

  startDrag = (e) => {
    const rect = e.target.getBoundingClientRect();
    const mouseXDelta = e.clientX - rect.left;
    const mouseYDelta = e.clientY - rect.top;

    document.onmousemove = (e) => {
      this.#move(e.clientX - mouseXDelta, e.clientY - mouseYDelta);
    };
  };

  #move = (x, y) => {
    this.x = x;
    this.y = y;

    this.node.style.top = `${y}px`;
    this.node.style.left = `${x}px`;
  };
}
