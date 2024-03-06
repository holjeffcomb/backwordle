import "./App.css";
import WordleGrid from "./components/WordleGrid";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import styled from "styled-components";

const LayoutStyles = styled.div`
  display: flex;
  flex-direction: column;
`;

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
    <LayoutStyles>
      <Header />
      <WordleGrid correctWord={word} fetchNewWord={fetchWord} />
      <Footer />
    </LayoutStyles>
  );
}

export default App;
