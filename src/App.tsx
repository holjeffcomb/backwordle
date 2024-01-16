import { useState } from "react";
import "./App.css";
import WordleGrid from "./components/WordleGrid";
import styled from "styled-components";

function App() {
  const correctWord = "react";
  return (
    <>
      <h1>Backwordle</h1>
      <WordleGrid correctWord={correctWord} />
    </>
  );
}

export default App;
