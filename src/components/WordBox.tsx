import styled from "styled-components";

const BoxStyles = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  display: "inline-block";
  margin: "2px";
  text-align: "center";
  line-height: "50px"; // Vertically center the text
  color: black;
  font-size: 25px;
  font-family: "Crimson Text";
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
