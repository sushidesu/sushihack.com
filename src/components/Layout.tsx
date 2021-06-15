import clsx from "clsx"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { Container } from "./Container"

export type Props = {
  children?: React.ReactNode
}

export const Layout = ({ children }: Props): JSX.Element => (
  <div className={clsx("min-h-screen", "flex", "flex-col", "bg-space-blue")}>
    <Header />
    <main className={clsx("flex-auto")}>
      <Container>{children}</Container>
    </main>
    <Footer />
  </div>
)
