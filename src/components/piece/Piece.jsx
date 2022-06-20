import { useState } from "react";
import { useDrag, DragPreviewImage } from "react-dnd";

const Piece = ({ piece, pos, dragStart, dragEnd }) => {
  const [isHinted, setIsHinted] = useState(false);

  const [{ isDragging }, drag, preview] = useDrag({
    type: "PIECE",
    item: {
      id: `${piece.type}_${piece.color}`,
      pos: pos,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const clickHandler = () => {
    if (isHinted) {
      setIsHinted(false);
      dragEnd();
    } else {
      setIsHinted(true);
      dragStart(pos);
    }
  };

  const PIECE_IMG = `assets/pieces/${piece.type}_${piece.color}.png`;

  return (
    <>
      <DragPreviewImage connect={preview} src={PIECE_IMG} />
      <div
        className="piece"
        ref={drag}
        onDragStart={() => dragStart(pos)}
        onClick={clickHandler}
        style={{ opacity: isDragging ? 0 : 1, cursor: "grab" }}
      >
        {<img src={PIECE_IMG} alt="PIECE" />}
      </div>
    </>
  );
};

export default Piece;
