import Piece from "../piece/Piece";
import { useDrop } from "react-dnd";

import { handleMove } from "../../Game";

import { gameSubject } from "../../Game";
import { useEffect, useState } from "react";

import Promote from "../promote/Promote";

const Tile = ({
  piece,
  isDark,
  pos,
  hinted,
  dragStart,
  dragEnd,
  isKingInCheck,
}) => {
  const [promotion, setPromotion] = useState(null);
  const [, drop] = useDrop(() => ({
    accept: "PIECE",
    drop: (item) => {
      dragEnd();
      handleMove(item.pos, pos);
    },
  }));

  useEffect(() => {
    const subscribe = gameSubject.subscribe(({ pendingPromotion }) => {
      pendingPromotion && pendingPromotion.to === pos
        ? setPromotion(pendingPromotion)
        : setPromotion(null);
    });

    return () => {
      subscribe.unsubscribe();
    };
  }, [pos]);

  return (
    <>
      {promotion && <Promote promotion={promotion} />}
      <div
        className={`tile ${isDark ? "dark-tile" : "white-tile"} ${
          promotion ? "promotion-indicator" : ""
        }`}
        ref={drop}
      >
        {isKingInCheck && <div className="king-checked"></div>}
        {hinted &&
          (piece ? (
            <>
              <div className="piece-hinted"></div>
              <div className="filler"></div>
            </>
          ) : (
            <>
              <div className="hinted"></div>
            </>
          ))}
        {piece && (
          <Piece
            piece={piece}
            pos={pos}
            dragStart={dragStart}
            dragEnd={dragEnd}
          />
        )}
      </div>
    </>
  );
};

export default Tile;
