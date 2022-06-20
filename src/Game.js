import { Chess } from "chess.js";
import { BehaviorSubject } from "rxjs";
import Fens from "./Fens";

/*
const PROMOTION = "rnb2bnr/pppPkppp/8/4p3/7q/8/PPPP1PPP/RNBQKBNR w KQ - 1 5";
const STALE_MATE = "4k3/4P3/4K3/8/8/8/8/8 b - - 0 78";
const CHECK_MATE =
  "rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3";

*/

const chess = new Chess();
const fens = new Fens();

export const gameSubject = new BehaviorSubject();

export const initGame = () => {
  fens.isEmpty() ? fens.pushFen(chess.fen()) : chess.load(fens.getCurrentFen());
  updateGame();
};

export const handleMove = (from, to) => {
  const promotions = chess.moves({ verbose: true }).filter((m) => m.promotion);

  if (promotions.some((p) => `${p.from}:${p.to}` === `${from}:${to}`)) {
    const pendingPromotion = { from, to, color: promotions[0].color };
    updateGame(pendingPromotion);
  }
  const { pendingPromotion } = gameSubject.getValue();
  if (!pendingPromotion) move(from, to);
};

export const move = (from, to, promotion) => {
  let tempMove = { from, to };
  promotion && (tempMove = { ...tempMove, promotion });

  const legalMove = chess.move(tempMove);
  if (legalMove) {
    fens.pushFen(chess.fen());
    updateGame();
  }
};

export const getMoves = (from) => {
  const moves = chess.moves({verbose: true}).filter(m => m.from === from).map(m => m.to);
  return moves;
}

const updateGame = (pendingPromotion) => {
  const isGameOver = chess.game_over();

  const newGame = {
    board: chess.board(),
    pendingPromotion,
    isGameOver,
    isInCheck: chess.in_check(),
    turn: chess.turn(),
    result: isGameOver ? getGameResult() : null,
  };

  gameSubject.next(newGame);
};

const getGameResult = () => {
  if (chess.in_checkmate()) {
    const winner = chess.turn() === "w" ? "BLACK" : "WHITE";
    return `CHECKMATE - ${winner} WON!`;
  } else if (chess.in_draw()) {
    let reason = `50 MOVES RULE`;
    if (chess.in_stalemate()) reason = "STALEMATE";
    else if (chess.in_threefold_repetition()) reason = "THREEFOLD REPITITION";
    else if (chess.insufficient_material()) reason = "INSUFFICIENT MATERIAL";
    return `DRAW - ${reason}`;
  } else return `UNKNOWN REASON`;
};

export const resetGame = () => {
  chess.reset();
  fens.clearFens();
  fens.pushFen(chess.fen());
  updateGame();
};

export const goBack = () => {
  if (!fens.isLast()) {
    fens.popFen();
    chess.load(fens.getCurrentFen());
    updateGame();
  }
};
