function addPiece() {
  const node = new Piece(100, 0);
  document.getElementById("board").appendChild(node.node);
}

class Piece {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.node = document.createElement("div");

    this.node.style.width = "50px";
    this.node.style.height = "50px";
    this.node.style.position = "absolute";
    this.node.style.backgroundColor = "black";
    this.node.draggable = false;

    this.#move(this.x, this.y);
    this.#initDrag(this.node);
  }

  #initDrag = (node) => {
    node.onmousedown = (e) => {
      const rect = e.target.getBoundingClientRect();
      const mouseXDelta = e.clientX - rect.left;
      const mouseYDelta = e.clientY - rect.top;

      document.onmousemove = (e) => {
        this.#move(e.clientX - mouseXDelta, e.clientY - mouseYDelta);
      };
    };

    node.onmouseup = () => {
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
