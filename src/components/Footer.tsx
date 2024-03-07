import styled from "styled-components";

const FooterStyles = styled.footer`
  margin-top: 4em;
  color: #525252;
  font-family: "Rasa Variable";
`;

function Footer() {
  return (
    <FooterStyles>
      <p>&copy; 2024 Jeff Holcomb</p>
    </FooterStyles>
  );
}

export default Footer;
