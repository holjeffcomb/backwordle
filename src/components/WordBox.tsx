import styled from "styled-components";

const BoxStyles = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  display: flex; // Use flexbox for alignment
  justify-content: center; // Horizontally center the content
  align-items: center; // Vertically center the content
  margin: 2px;
  color: #000000;
  font-size: 25px;
  font-family: "Crimson Text", serif; // Ensure fallback fonts are specified
`;

type WordBoxProps = {
  letter: string;
  color: string;
};

function WordBox({ letter, color }: WordBoxProps) {
  return (
    <BoxStyles style={{ backgroundColor: color }}>
      {letter.toUpperCase()}
    </BoxStyles>
  );
}

export default WordBox;
