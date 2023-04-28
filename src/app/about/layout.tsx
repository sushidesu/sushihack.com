import { ReactNode } from "react"
import { Wrapper } from "components/ui/Wrapper/Wrapper"
import { Container } from "components/ui/Container/Container"

export default function RootLayout({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>
  )
}
