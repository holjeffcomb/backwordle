import styled from "styled-components";

const InputContainer = styled.div`
  margin-top: 2em;
`;

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

interface InputProps {
  correctWord: string;
  handleGuess: () => void;
  currentGuess: string;
  setCurrentGuess: (guess: string) => void;
}

function Input({
  correctWord,
  handleGuess,
  currentGuess,
  setCurrentGuess,
}: InputProps) {
  return (
    <InputContainer>
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
    </InputContainer>
  );
}

export default Input;
