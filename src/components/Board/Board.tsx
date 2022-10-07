import React from "react";
import "./Board.css";

interface Props {
  image?: string;
  number: number;
}

const Board = ({ number, image }: Props) => {
  if (number % 2 === 0) {
    return (
      <div className="board black-board">
        {image && <div style={{backgroundImage: `url(${image})`}} className="pieceChess"></div>}
      </div>
    );
  } else {
    return (
      <div className="board white-board">
        {image && <div style={{backgroundImage: `url(${image})`}} className="pieceChess"></div>}
      </div>
    );
  }
};

export default Board;
