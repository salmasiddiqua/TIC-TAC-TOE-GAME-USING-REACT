import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import GameOver from "./Components/GameOver";
import Log from "./Components/Log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./WinningCombination.js";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function winnerName(gameBoard, players) {
  let winner;
  for (const winCombination of WINNING_COMBINATIONS) {
    const firstWinningSymbol =
      gameBoard[winCombination[0].row][winCombination[0].column];
    const secondWinningSymbol =
      gameBoard[winCombination[1].row][winCombination[1].column];
    const thirdWinningSymbol =
      gameBoard[winCombination[2].row][winCombination[2].column];
    if (
      firstWinningSymbol &&
      firstWinningSymbol === secondWinningSymbol &&
      firstWinningSymbol === thirdWinningSymbol
    ) {
      winner = players[firstWinningSymbol];
    }
  }
  return winner;
}
function derievedActiveState(gameTurns) {
  let currentPlayerSymbol = "X";
  if (gameTurns.length > 0)
    currentPlayerSymbol = gameTurns[0].player === "X" ? "O" : "X";
  return currentPlayerSymbol;
}

function App() {
  const [players, setPlayers] = useState({ X: "Player 1", O: "Player 2" });
  const [gameTurns, setgameTurns] = useState([]);
  const activePlayer = derievedActiveState(gameTurns);
  let winner;
  let draw = false;
  let gameBoard = [...initialGameBoard.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    console.log(player);
    gameBoard[row][col] = player;
  }
  winner = winnerName(gameBoard,players);
  if (!winner && gameTurns.length == 9) draw = true;
  /*{const [activePlayer, setActivePlayer] = useState("X");}*/
  function handleRematch() {
    setgameTurns([]);
  }
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName };
    });
  }
  function handleSelectSquare(rowIndex, colIndex) {
    /*{setActivePlayer((playerSymbol) => (playerSymbol === "X" ? "O" : "X"));*/

    setgameTurns((prevGameTurn) => {
      const currentPlayerSymbol = derievedActiveState(prevGameTurn);
      const updatedgameTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayerSymbol,
        },
        ...prevGameTurn,
      ];
      return updatedgameTurns;
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" class="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {winner && <GameOver winner={winner} handleClick={handleRematch} />}
        {draw && <GameOver draw={draw} handleClick={handleRematch} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>

      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
