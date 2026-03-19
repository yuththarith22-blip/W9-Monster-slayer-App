import React from "react";
import Monster from "./Monster.jsx";
import Player from "./Player.jsx";
import GameOver from "./GameOver.jsx";
import Logs from "./Logs.jsx";

// ----------------------------------------------------------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------------------------------------------------------

// Generate a random values in the range {min, max}
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Create an attack log
function createLogAttack(isPlayer, damage) {
  return {
    isPlayer: isPlayer,
    isDamage: true,
    text: ` takes ${damage} damages`,
  };
}

// Create a healing log
function createLogHeal(healing) {
  return {
    isPlayer: true,
    isDamage: false,
    text: ` heal ${healing} life points`,
  };
}

function Game() {
  // ----------------------------------------------------------------------------------------------------------
  // STATES & VARIABLES
  // ----------------------------------------------------------------------------------------------------------
  const [monsterHealth, setMonsterHealth] = React.useState(100);
  const [playerHealth, setPlayerHealth] = React.useState(100);
  const [roundCount, setRoundCount] = React.useState(0);
  const [logs, setLogs] = React.useState([]);

  const isSpecialAttackAvailable = roundCount > 0 && roundCount % 3 === 0;
  const isGameOver = monsterHealth <= 0 || playerHealth <= 0;

  let gameOverTitle = "";
  if (isGameOver) {
    if (monsterHealth <= 0 && playerHealth <= 0) {
      gameOverTitle = "Draw game!";
    } else if (monsterHealth <= 0) {
      gameOverTitle = "You won!";
    } else {
      gameOverTitle = "You lost!";
    }
  }

  // ----------------------------------------------------------------------------------------------------------
  // BUTTONS EVENT FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------
  function addLog(log) {
    setLogs((prevLogs) => [log, ...prevLogs]);
  }

  function monsterAttacks() {
    const monsterDamage = getRandomValue(8, 15);
    setPlayerHealth((prevHealth) => Math.max(prevHealth - monsterDamage, 0));
    addLog(createLogAttack(false, monsterDamage));
  }

  function attackMonster() {
    const playerDamage = getRandomValue(5, 12);
    setMonsterHealth((prevHealth) => Math.max(prevHealth - playerDamage, 0));
    addLog(createLogAttack(true, playerDamage));
    setRoundCount((prevRound) => prevRound + 1);
    monsterAttacks();
  }

  function specialAttackMonster() {
    const playerDamage = getRandomValue(10, 25);
    setMonsterHealth((prevHealth) => Math.max(prevHealth - playerDamage, 0));
    addLog(createLogAttack(true, playerDamage));
    setRoundCount((prevRound) => prevRound + 1);
    monsterAttacks();
  }

  function healPlayer() {
    const healingValue = getRandomValue(8, 20);
    setPlayerHealth((prevHealth) => Math.min(prevHealth + healingValue, 100));
    addLog(createLogHeal(healingValue));
    setRoundCount((prevRound) => prevRound + 1);
    monsterAttacks();
  }

  function killYourself() {
    setPlayerHealth(0);
    addLog({
      isPlayer: true,
      isDamage: true,
      text: " gave up and surrendered",
    });
  }

  function restartGame() {
    setMonsterHealth(100);
    setPlayerHealth(100);
    setRoundCount(0);
    setLogs([]);
  }

  // ----------------------------------------------------------------------------------------------------------
  // JSX FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------
  function renderActionButtons() {
    if (isGameOver) {
      return null;
    }

    return (
      <section id="controls">
        <button onClick={attackMonster}>ATTACK</button>
        <button
          onClick={specialAttackMonster}
          disabled={!isSpecialAttackAvailable}
        >
          SPECIAL !
        </button>
        <button onClick={healPlayer}>HEAL</button>
        <button onClick={killYourself}>KILL YOURSELF</button>
      </section>
    );
  }

  function renderGameOver() {
    if (!isGameOver) {
      return null;
    }

    return <GameOver title={gameOverTitle} restartGame={restartGame} />;
  }

  // ----------------------------------------------------------------------------------------------------------
  // MAIN  TEMPLATE
  // ----------------------------------------------------------------------------------------------------------
  return (
    <>
      <Monster healthPercentage={monsterHealth} />
      <Player healthPercentage={playerHealth} />
      {renderGameOver()}
      {renderActionButtons()}
      <Logs logs={logs} />
    </>
  );
}

export default Game;
