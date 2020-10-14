import { styled } from "plugins/emotion"
import { Container } from "./Container"

export const Footer = (): JSX.Element => (
  <StyledFooter>
    <Container>
      <Centered>©️ sushidesu</Centered>
    </Container>
  </StyledFooter>
)

const StyledFooter = styled.footer`
  background-color: #bce;
`

const Centered = styled.p`
  margin: 10px 0;
  text-align: center;
`
