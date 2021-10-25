import { Container } from "../Container/Container"
import styles from "./Footer.module.css"

export const Footer = (): JSX.Element => (
  <footer>
    <Container>
      <p className={styles.copyright}>©️ sushidesu</p>
    </Container>
  </footer>
)
