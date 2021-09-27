import clsx from "clsx"
import { Container } from "./Container/Container"

export const Footer = (): JSX.Element => (
  <footer className={clsx()}>
    <Container>
      <p className={clsx("my-5", "text-center", "text-blue-gray-800")}>
        ©️ sushidesu
      </p>
    </Container>
  </footer>
)
