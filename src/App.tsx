import "./App.css";
import WordleGrid from "./components/WordleGrid";
import { useState, useEffect } from "react";

function App() {
  const [word, setWord] = useState("");

  useEffect(() => {
    fetchWord();
  }, []);

  const fetchWord = () => {
    fetch("http://localhost:3000/word")
      .then((response) => response.json())
      .then((data) => {
        console.log("New word:", data.word);
        const reversedWord = data.word.split("").reverse().join("");
        console.log("Word reversed: ", reversedWord);
        setWord(reversedWord);
      })
      .catch((error) => console.error("Error fetching word:", error));
  };

  return (
    <>
      <h1 className="title">Backwordle</h1>
      <WordleGrid correctWord={word} fetchNewWord={fetchWord} />
    </>
  );
}

export default App;
