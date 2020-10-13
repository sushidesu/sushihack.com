import React from "react"
import Link from "next/link"
import { styled } from "plugins/emotion"

export const Layout: React.FC = ({ children }) => (
  <Wrapper>
    <Header>
      <Container>
        <p>
          <Link href="/">This is a header</Link>
        </p>
        <p>
          <Link href="/about">About</Link>
        </p>
      </Container>
    </Header>
    <Main>
      <Container>{children}</Container>
    </Main>
    <Footer>
      <Container>©️ sushidesu</Container>
    </Footer>
  </Wrapper>
)

const Wrapper = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Header = styled.header`
  overflow: hidden;
  background-color: #fda;
`

const Main = styled.main`
  flex: 1 1 auto;
  background-color: #ddb;
`

const Footer = styled.footer`
  background-color: #bce;
`
const Container = styled.div`
  max-width: 750pt;
  margin: 0 auto;
  padding: 0 12px;
`
