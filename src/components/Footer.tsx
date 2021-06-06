import clsx from "clsx"
import { Container } from "./Container"

export const Footer = (): JSX.Element => (
  <footer className="bg-yellow-200">
    <Container>
      <p className={clsx("my-5", "text-center")}>©️ sushidesu</p>
    </Container>
  </footer>
)
