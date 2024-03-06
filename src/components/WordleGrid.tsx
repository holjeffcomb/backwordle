import { useState } from "react";
import WordBox from "./WordBox";
import styled from "styled-components";

const InputStyles = styled.input`
  font-family: "Crimson Text";
  letter-spacing: 3px;
`;

const ButtonStyles = styled.button`
  border-radius: 50%;
  padding: 0.2em;
  margin-left: 1em;
  background-color: green;
  border: solid 1px black;
  width: 30px;
  height: 30px;
`;

interface WordleGridProps {
  correctWord: string;
  fetchNewWord: () => void;
}

interface Guess {
  guess: string;
  result: ("green" | "yellow" | "gray")[];
}

function WordleGrid({ correctWord, fetchNewWord }: WordleGridProps) {
  const [turn, setTurn] = useState(1);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameState, setGameState] = useState("ongoing");

  const handleGuess = () => {
    setTurn(turn + 1);
    if (currentGuess.length === correctWord.length) {
      const guessResult = wordleGuess(correctWord, currentGuess);
      setGuesses([...guesses, { guess: currentGuess, result: guessResult }]);
      setCurrentGuess(""); // Reset the current guess input
    } else {
      // Handle error for incorrect length
      alert("Guess must be " + correctWord.length + " letters");
    }

    console.log("turn is now " + turn);
    if (turn >= 6) {
      console.log("GAME OVER");
      setGameState("ended");
    }
  };

  const resetGame = () => {
    setTurn(1);
    setGameState("ongoing");
    setGuesses([]);
    fetchNewWord();
  };

  return (
    <div>
      {gameState === "ended" ? (
        <div>
          <h3>Game Over</h3>
          <button onClick={resetGame}>Play again</button>
        </div>
      ) : (
        <div></div>
      )}
      {guesses.map((guessObj, rowIndex) => (
        <div key={rowIndex} className="word-row" style={{ display: "flex" }}>
          {guessObj.guess.split("").map((letter, index) => (
            <WordBox
              key={index}
              letter={letter}
              color={getColorFromResult(guessObj.result[index])}
            />
          ))}
        </div>
      ))}
      <div>
        <InputStyles
          type="text"
          value={currentGuess.toUpperCase()}
          onChange={(e) => setCurrentGuess(e.target.value)}
          maxLength={correctWord.length}
        />
        <ButtonStyles onClick={handleGuess}>
          <svg
            width="8"
            height="10"
            viewBox="0 0 10 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.29289 0.292893C4.68342 -0.0976311 5.31658 -0.0976311 5.70711 0.292893L9.70711 4.29289C10.0976 4.68342 10.0976 5.31658 9.70711 5.70711C9.31658 6.09763 8.68342 6.09763 8.29289 5.70711L6 3.41421L6 11C6 11.5523 5.55229 12 5 12C4.44772 12 4 11.5523 4 11L4 3.41421L1.70711 5.70711C1.31658 6.09763 0.683418 6.09763 0.292893 5.70711C-0.0976311 5.31658 -0.0976311 4.68342 0.292893 4.29289L4.29289 0.292893Z"
              fill="white"
            />
          </svg>
        </ButtonStyles>
      </div>
    </div>
  );
}

function getColorFromResult(result: "green" | "yellow" | "gray") {
  switch (result) {
    case "green":
      return "green";
    case "yellow":
      return "yellow";
    default:
      return "gray";
  }
}

function wordleGuess(correctWord: string, guessedWord: string) {
  const result = new Array(guessedWord.length).fill("gray");
  const correctLetters: (string | null)[] = correctWord.split("");

  // First, check for correct letters in the correct position (green)
  for (let i = 0; i < guessedWord.length; i++) {
    if (guessedWord[i].toUpperCase() === correctWord[i].toUpperCase()) {
      result[i] = "green";
      correctLetters[i] = null; // Mark this letter as used
    }
  }

  // Then, check for correct letters in the wrong position (yellow)
  for (let i = 0; i < guessedWord.length; i++) {
    if (result[i] !== "green" && correctLetters.includes(guessedWord[i])) {
      result[i] = "yellow";
      correctLetters[correctLetters.indexOf(guessedWord[i])] = null; // Mark this letter as used
    }
  }

  return result;
}

export default WordleGrid;
