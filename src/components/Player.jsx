import { useState } from "react";
export default function PLayer({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setplayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  function handleEditClick() {
    setIsEditing((editing) => !editing);
    if (isEditing) onChangeName(symbol, playerName);
  }
  function handleOnchange(event) {
    setplayerName(event.target.value);
  }
  let spanInput;
  spanInput = <span className="player-name">{playerName}</span>;
  if (isEditing)
    spanInput = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handleOnchange}
      />
    );

  return (
    <>
      <li className={isActive ? "active" : undefined}>
        <span className="player">
          {spanInput}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
      </li>
    </>
  );
}
