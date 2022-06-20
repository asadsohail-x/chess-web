import "./App.scss";

import { useEffect, useState } from "react";
import { gameSubject, initGame } from "./Game";
import Board from "./components/board/Board";
import GameOver from "./components/gameOver/GameOver";
import Helper from "./components/helper/Helper";

const App = () => {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [result, setResult] = useState("");
  const [turn, setTurn] = useState();
  const [isInCheck, setIsInCheck] = useState(false);
  const [isResigned, setIsResigned] = useState(false);
  const [theme, setTheme] = useState("black");

  useEffect(() => {
    initGame();
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board);
      setIsGameOver(game.isGameOver);
      setResult(game.result);
      setTurn(game.turn);
      setIsInCheck(game.isInCheck);
    });
    return () => {
      subscribe.unsubscribe();
    };
  }, []);

  return (
    <main className={`${isInCheck ? "in-check" : ""} ${theme}`}>
      {isGameOver && <GameOver result={result} />}
      {isResigned && (
        <GameOver
          result={`${turn === "w" ? "BLACK" : "WHITE"} WON! ${
            turn === "w" ? "WHITE" : "BLACK"
          } RESIGNED`}
          resigned
          restart={() => setIsResigned(false)}
        />
      )}
      <Helper
        turn={turn}
        resign={() => setIsResigned(true)}
        selectedTheme={theme}
        setTheme={setTheme}
        isInCheck={isInCheck}
      />
      <Board board={board} turn={turn} isInCheck={isInCheck} />
    </main>
  );
};

export default App;
