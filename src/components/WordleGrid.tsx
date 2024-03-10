import { useState } from "react";
import WordBox from "./WordBox";
import Input from "./Input";

interface ColorResult {
  result: "green" | "yellow" | "gray";
}

interface WordleGridProps {
  correctWord: string;
  newWord: () => void;
}

interface Guess {
  guess: string;
  result: ColorResult["result"][];
}

const emptyGrid: Guess[] = [
  { guess: "     ", result: ["gray", "gray", "gray", "gray", "gray"] },
  { guess: "     ", result: ["gray", "gray", "gray", "gray", "gray"] },
  { guess: "     ", result: ["gray", "gray", "gray", "gray", "gray"] },
  { guess: "     ", result: ["gray", "gray", "gray", "gray", "gray"] },
  { guess: "     ", result: ["gray", "gray", "gray", "gray", "gray"] },
  { guess: "     ", result: ["gray", "gray", "gray", "gray", "gray"] },
];

function WordleGrid({ correctWord, newWord }: WordleGridProps) {
  const [turn, setTurn] = useState(1);
  const [guesses, setGuesses] = useState<Guess[]>(emptyGrid);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameState, setGameState] = useState("ongoing");

  const checkIfWord = async (word: string): Promise<boolean> => {
    const response = await fetch(
      `http://localhost:3000/check-word/${reverseString(word).toLowerCase()}`
    );
    const data = await response.text();
    return data === "true";
  };

  function reverseString(str: string): string {
    return str.split("").reduce((acc, char) => char + acc, "");
  }

  const handleGuess = async () => {
    if (currentGuess.length !== 5) {
      alert("Guess must be " + correctWord.length + " letters");
    } else {
      if (await checkIfWord(currentGuess)) {
        setTurn(turn + 1);
        const guessResult = wordleGuess(correctWord, currentGuess);
        const newGuessGrid = [...guesses];
        newGuessGrid[turn - 1] = { guess: currentGuess, result: guessResult };
        setGuesses(newGuessGrid);
        setCurrentGuess(""); // Reset the current guess input
        if (turn >= 6) {
          console.log("GAME OVER");
          setGameState("ended");
        }
      } else {
        alert("Not a word");
      }
    }
  };

  function getColorFromResult(result: ColorResult["result"]) {
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
    const correctLetters: (string | null)[] = correctWord
      .toUpperCase()
      .split("");

    // Mark green first
    for (let i = 0; i < guessedWord.length; i++) {
      if (guessedWord[i].toUpperCase() === correctWord[i].toUpperCase()) {
        result[i] = "green";
        correctLetters[i] = null; // This letter has been correctly guessed and should not be used again
      }
    }

    // Then mark yellow, ensuring not to reuse green-marked letters
    for (let i = 0; i < guessedWord.length; i++) {
      if (result[i] !== "green") {
        const guessedLetter = guessedWord[i].toUpperCase();
        const indexInCorrectLetters = correctLetters.indexOf(guessedLetter);
        if (indexInCorrectLetters !== -1) {
          result[i] = "yellow";
          correctLetters[indexInCorrectLetters] = null; // Mark this letter as used to avoid reusing it
        }
      }
    }

    return result;
  }

  const resetGame = () => {
    setTurn(1);
    setGameState("ongoing");
    setGuesses(emptyGrid);
    newWord();
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
      <Input
        correctWord={correctWord}
        handleGuess={handleGuess}
        currentGuess={currentGuess}
        setCurrentGuess={setCurrentGuess}
      />

      <button onClick={resetGame}>New Word</button>
    </div>
  );
}

export default WordleGrid;
