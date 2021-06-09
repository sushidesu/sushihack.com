import clsx from "clsx"
import { Container } from "./Container"

export const Footer = (): JSX.Element => (
  <footer className={clsx("bg-blue-gray-100")}>
    <Container>
      <p className={clsx("my-5", "text-center", "text-blue-gray-500")}>
        ©️ sushidesu
      </p>
    </Container>
  </footer>
)
