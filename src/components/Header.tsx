import Link from "next/link"
import clsx from "clsx"
import { Container } from "./Container"

export const Header = (): JSX.Element => (
  <header className={clsx("py-3")}>
    <Container>
      <div
        className={clsx("flex", "justify-between", "items-center", "px-0.5")}
      >
        <p className={clsx("text-2xl", "font-bold", "text-white")}>
          <Link href="/">sushihack</Link>
        </p>
        <p className={clsx("text-white")}>
          <Link href="/about">About</Link>
        </p>
      </div>
    </Container>
  </header>
)
