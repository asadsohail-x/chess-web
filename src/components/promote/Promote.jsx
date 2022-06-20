import { move } from "../../Game";

const PROMOTION_PIECES = ["r", "n", "b", "q"];

const Promote = ({ promotion: { from, to, color } }) => {
  return (
    <div className="promotion-container">
      {PROMOTION_PIECES.map((p, i) => {
        return (
          <div
            key={i}
            className="promotion-tile"
            onClick={() => move(from, to, p)}
          >
            <img src={`assets/pieces/${p}_${color}.png`} alt="PIECE" />
          </div>
        );
      })}
    </div>
  );
};

export default Promote;
