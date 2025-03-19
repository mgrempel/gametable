document.addEventListener("DOMContentLoaded", () => {
  //How do we represent our pieces in the board?
  const drawer = document.getElementById("drawer");
  const board = document.getElementById("board");

  const drawerPieces = [];
  const squarePiece = document.createElement("div");
  squarePiece.style.width = "50px";
  squarePiece.style.height = "50px";
  squarePiece.style.backgroundColor = "black";
  squarePiece.draggable = false;
  drawerPieces.push(squarePiece);

  for (const piece of drawerPieces) {
    piece.onmousedown = (e) => {
      const boardPiece = new Piece(0, 0, piece.cloneNode(false));
      board.appendChild(boardPiece.node);
      boardPiece.node.onmousedown(e);
    };
    drawer.appendChild(piece);
  }

  // //Add pieces to drawer.
  // let isOverDrawer = false;
  // const drawer = document.getElementById("drawer");
  // drawer.onmouseenter = () => {
  //   isOverDrawer = true;
  // };
  // drawer.onmouseleave = () => {
  //   isOverDrawer = false;
  // };
  // const piece = new Piece(0, 0, true).node;
  // piece.onmousedown = (e) => {
  //   const newPiece = new Piece(0, 0, false);
  //   newPiece.addEventListener(Piece.eventTypes.onDragStop, () => {
  //     if (isOverDrawer) {
  //       newPiece.node.remove();
  //     }
  //   });
  //   document.getElementById("board").appendChild(newPiece.node);
  //   newPiece.startDrag(e);
  // };
  // drawer.appendChild(piece);
});

function populateDrawer(pieces) {}

class Piece {
  constructor(x, y, node) {
    this.node = node;
    this.x = x;
    this.y = y;

    this.node.style.position = "absolute";
    this.node = node;
    this.node.draggable = false;
    this.#initDrag(this.node);
    this.#move(this.x, this.y);

    this.listeners = {};
  }

  #initDrag = (node) => {
    node.onmousedown = (e) => {
      this.startDrag(e);
      document.onmouseup = (e) => this.stopDrag(e);
    };
  };

  startDrag = (e) => {
    this.node.style.pointerEvents = "none";
    const rect = e.target.getBoundingClientRect();
    const mouseXDelta = e.clientX - rect.left;
    const mouseYDelta = e.clientY - rect.top;

    document.onmousemove = (e) => {
      this.#move(e.clientX - mouseXDelta, e.clientY - mouseYDelta);
    };
  };

  stopDrag = (e) => {
    console.log("hit");
    this.#emit(Piece.eventTypes.onDragStop, e);
    this.node.style.pointerEvents = "auto";
    document.onmousemove = null;
    document.onmouseup = null;
  };

  #move = (x, y) => {
    this.x = x;
    this.y = y;

    this.node.style.top = `${y}px`;
    this.node.style.left = `${x}px`;
  };

  addEventListener(method, callback) {
    this.listeners[method] = callback;
  }

  #emit(method, payload = null) {
    const callback = this.listeners[method];
    if (typeof callback === "function") {
      callback(payload);
    }
  }

  static eventTypes = {
    onDragStop: "ondragstop",
  };
}
