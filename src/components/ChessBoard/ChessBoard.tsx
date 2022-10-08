import React, { useEffect, useRef, useState } from 'react';
import './ChessBoard.css';
import Board from '../Board/Board';

const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

interface Piece {
  image: string;
  x: number;
  y: number;
}

const iBoardState: Piece[] = [];

for (let p = 0; p < 2; p++) {
  const type = p === 0 ? 'b' : 'w';
  const y = p === 0 ? 7 : 0;

  // Rook Img
  iBoardState.push({
    image: `images/rook_${type}.png`,
    x: 0,
    y,
  });
  iBoardState.push({
    image: `images/rook_${type}.png`,
    x: 7,
    y,
  });
  // knight Img
  iBoardState.push({
    image: `images/knight_${type}.png`,
    x: 1,
    y,
  });
  iBoardState.push({
    image: `images/knight_${type}.png`,
    x: 6,
    y,
  });
  // bishop Img
  iBoardState.push({
    image: `images/bishop_${type}.png`,
    x: 2,
    y,
  });
  iBoardState.push({
    image: `images/bishop_${type}.png`,
    x: 5,
    y,
  });
  // king Img
  iBoardState.push({
    image: `images/king_${type}.png`,
    x: 4,
    y,
  });
  // queen Img
  iBoardState.push({
    image: `images/queen_${type}.png`,
    x: 3,
    y,
  });
}

// Pawn Img Blak
for (let i = 0; i < 8; i++) {
  iBoardState.push({
    image: 'images/pawn_b.png',
    x: i,
    y: 6,
  });
}

// Pawn Img White
for (let i = 0; i < 8; i++) {
  iBoardState.push({
    image: 'images/pawn_w.png',
    x: i,
    y: 1,
  });
}

const ChessBoard = () => {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [gridX, gridSetX] = useState(0);
  const [gridY, gridSetY] = useState(0);
  const [pieces, setPieces] = useState<Piece[]>(iBoardState);
  const chessBoardRef = useRef<HTMLDivElement>(null);
  let board = [];

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    const boardChess = chessBoardRef.current;
    if (element.classList.contains('pieceChess') && boardChess) {
      gridSetX(Math.floor((e.clientX - boardChess.offsetLeft) / 100));
      gridSetY(Math.abs(Math.ceil((e.clientY - boardChess.offsetTop - 800) / 100)));
      const x = e.clientX - 50;
      const y = e.clientY - 50;

      element.style.position = 'absolute';
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      setActivePiece(element);
    }
  }

  function movePiece(e: React.MouseEvent) {
    const boardChess = chessBoardRef.current;
    if (activePiece && boardChess) {
      const minX = boardChess.offsetLeft - 25;
      const minY = boardChess.offsetTop - 25;
      const maxX = boardChess.offsetLeft + boardChess.clientWidth - 75;
      const maxY = boardChess.offsetTop + boardChess.clientHeight - 75;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = 'absolute';

      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${x}px`;
      }

      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }
    }
  }

  function dropPiece(e: React.MouseEvent) {
    const boardChess = chessBoardRef.current;
    if (activePiece && boardChess) {
      const x = Math.floor((e.clientX - boardChess.offsetLeft) / 100);
      const y = Math.abs(Math.ceil((e.clientY - boardChess.offsetTop - 800) / 100));
      setPieces((value) => {
        const pieces = value.map((p) => {
          if (p.x === gridX && p.y === gridY) {
            p.x = x;
            p.y = y;
          }
          return p;
        });
        return pieces;
      });
      setActivePiece(null);
    }
  }

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = j + i + 2;
      let image = undefined;

      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });

      board.push(<Board key={`${j}, ${i}`} image={image} number={number} />);
    }
  }

  return (
    <div
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      id="chessBoard"
      ref={chessBoardRef}
    >
      {board}
    </div>
  );
};

export default ChessBoard;
