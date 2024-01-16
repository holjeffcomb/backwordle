import "./App.css";
import WordleGrid from "./components/WordleGrid";
import { useState, useEffect } from "react";

function App() {
  const [word, setWord] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/word")
      .then((response) => response.json())
      .then((data) => {
        console.log("New word:", data.word);
        // Set the word in your app's state
        setWord(data.word);
      })
      .catch((error) => console.error("Error fetching word:", error));
  }, []);

  return (
    <>
      <h1>Backwordle</h1>
      <WordleGrid correctWord={word} />
    </>
  );
}

export default App;
