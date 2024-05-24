import { useState, useRef } from "react";
export default function Player() {
  const [displayeName, setDisplayName] = useState('');
  const playerName = useRef();

  function handleSetName(){
    setDisplayName(playerName.current.value);
    playerName.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome {displayeName === '' ? 'unknown entity' : displayeName}</h2>
      <p>
        <input type="text" ref={playerName}/>
        <button onClick={handleSetName}>Set Name</button>
      </p>
    </section>
  );
}
