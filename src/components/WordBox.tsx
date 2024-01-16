import styled from "styled-components";

const BoxStyles = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  display: "inline-block";
  margin: "2px";
  text-align: "center";
  line-height: "50px"; // Vertically center the text
  background-color: color;
`;

type WordBoxProps = {
  letter: string;
  color: string;
};

function WordBox({ letter, color }: WordBoxProps) {
  return <BoxStyles style={{ color }}>{letter}</BoxStyles>;
}

export default WordBox;
