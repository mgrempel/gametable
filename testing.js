window.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");

  const piece = new Piece(0, 0);
  const piece2 = new Piece(100, 0);

  board.appendChild(piece.node);
  board.appendChild(piece2.node);

  // piece.draw(board);
});

class Piece {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.node = document.createElement("div");

    this.node.style.width = "50px";
    this.node.style.height = "50px";
    this.node.style.position = "absolute";
    this.node.style.backgroundColor = "black";

    this.#move(this.x, this.y);
    this.#initDrag(this.node);
  }

  #initDrag = (node) => {
    node.onmousedown = (e) => {
      console.log("mouse down event");
      document.onmousemove = (e) => {
        this.#move(e.clientX, e.clientY);
      };
    };

    node.onmouseup = (e) => {
      document.onmousemove = null;
    };
  };

  #move = (x, y) => {
    this.x = x;
    this.y = y;

    this.node.style.top = `${y}px`;
    this.node.style.left = `${x}px`;
  };
}
