import Link from "next/link"
import { styled } from "plugins/emotion"
import { Container } from "./Container"

export const Header = (): JSX.Element => (
  <StyledHeader>
    <Container>
      <Flex>
        <p>
          <Link href="/">This is a header</Link>
        </p>
        <p>
          <Link href="/about">About</Link>
        </p>
      </Flex>
    </Container>
  </StyledHeader>
)

const StyledHeader = styled.header`
  background-color: #fdb;
  overflow: hidden;
`

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`
