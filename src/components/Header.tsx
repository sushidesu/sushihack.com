import Link from "next/link"
import clsx from "clsx"
import { Container } from "./Container"

export const Header = (): JSX.Element => (
  <header className={clsx("py-3")}>
    <Container>
      <div className={clsx("flex", "justify-between", "items-center")}>
        <p className={clsx("text-2xl", "font-bold")}>
          <Link href="/">This is a header</Link>
        </p>
        <p>
          <Link href="/about">About</Link>
        </p>
      </div>
    </Container>
  </header>
)
