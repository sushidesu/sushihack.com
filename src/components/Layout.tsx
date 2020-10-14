import { styled } from "plugins/emotion"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { Container } from "./Container"

export const Layout: React.FC = ({ children }) => (
  <Wrapper>
    <Header />
    <Main>
      <Container>{children}</Container>
    </Main>
    <Footer />
  </Wrapper>
)

const Wrapper = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex: 1 1 auto;
`
