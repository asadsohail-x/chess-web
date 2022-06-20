import { resetGame } from "../../Game";

const GameOver = ({ result, resigned, restart }) => {
  const clickHandler = () => {
    resigned && restart();
    resetGame();
  };
  return (
    <div className="game-over-container">
      <div className="game-over">GAME OVER</div>
      <div className="result">{result}</div>
      <button className="btn" onClick={clickHandler}>
        New Game
      </button>
    </div>
  );
};

export default GameOver;
