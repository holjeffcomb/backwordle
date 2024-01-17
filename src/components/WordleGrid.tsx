import { useState } from "react";
import WordBox from "./WordBox";

function WordleGrid({ correctWord }) {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");

  const handleGuess = () => {
    if (currentGuess.length === correctWord.length) {
      const guessResult = wordleGuess(correctWord, currentGuess);
      setGuesses([...guesses, { guess: currentGuess, result: guessResult }]);
      setCurrentGuess(""); // Reset the current guess input
    } else {
      // Handle error for incorrect length
      alert("Guess must be " + correctWord.length + " letters");
    }
  };

  return (
    <div>
      <h3>{guesses.length} :tnuoc</h3>
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
        <input
          type="text"
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value)}
          maxLength={correctWord.length}
        />
        <button onClick={handleGuess}>sseug</button>
      </div>
    </div>
  );
}

function getColorFromResult(result) {
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
  const correctLetters = correctWord.split("");

  // First, check for correct letters in the correct position (green)
  for (let i = 0; i < guessedWord.length; i++) {
    if (guessedWord[i] === correctWord[i]) {
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
