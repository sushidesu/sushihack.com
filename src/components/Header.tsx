import Link from "next/link"
import { Container } from "./Container"

export const Header = (): JSX.Element => (
  <header className="bg-yellow-300">
    <Container>
      <div className="flex justify-between">
        <p>
          <Link href="/">This is a header</Link>
        </p>
        <p>
          <Link href="/about">About</Link>
        </p>
      </div>
    </Container>
  </header>
)
