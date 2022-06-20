import { useState } from "react";
import { getMoves } from "../../Game";
import Tile from "../tile/Tile";

const LETTERS = ["a", "b", "c", "d", "e", "f", "g", "h"];

const Board = ({ board, turn, isInCheck }) => {
  const [hints, setHints] = useState([]);
  const getXYPos = (i) => {
    const x = i % 8;
    const y = Math.abs(Math.floor(i / 8) - 7);
    return { x, y };
  };

  const isDark = (i) => {
    const { x, y } = getXYPos(i);
    return (x + y) % 2 === 1;
  };

  const getPos = (i) => {
    const { x, y } = getXYPos(i);
    const letter = LETTERS[x];
    return `${letter}${y + 1}`;
  };

  const dragStart = (from) => setHints(getMoves(from));
  const dragEnd = () => setHints([]);

  const checkHinted = (piece, i) => hints.includes(getPos(i));

  const checkedKing = (piece) => {
    if (piece)
      if (isInCheck && piece.type === "k" && turn === piece.color) return true;

    return false;
  };

  return (
    <div className="board">
      {board.flat().map((piece, i) => (
        <Tile
          hinted={checkHinted(piece, i)}
          isKingInCheck={checkedKing(piece)}
          dragStart={dragStart}
          dragEnd={dragEnd}
          key={i}
          isDark={isDark(i)}
          piece={piece}
          pos={getPos(i)}
        />
      ))}
    </div>
  );
};

export default Board;
