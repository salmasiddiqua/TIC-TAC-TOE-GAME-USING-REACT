export default function GameOver({ winner, draw, handleClick }) {
  return (
    <>
      <div id="game-over">
        <h2>Game Over!</h2>
        {winner && <p>{winner} won!</p>}
        {draw && <p> No winner its draw!</p>}
        <p>
          <button onClick={handleClick}>Rematch!</button>
        </p>
      </div>
    </>
  );
}
