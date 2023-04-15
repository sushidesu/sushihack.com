import Link from "next/link"
import { Container } from "../Container/Container"
import Logo from "./salmon_with_text.svg"
import styles from "./Header.module.css"

export const Header = (): JSX.Element => (
  <header className={styles.outer}>
    <Container>
      <div className={styles.inner}>
        <p>
          <Link href="/" className={styles["logo"]}>
            <Logo height={"40px"} />
          </Link>
        </p>
        <p>
          <Link href="/about" className={styles["about"]}>
            About
          </Link>
        </p>
      </div>
    </Container>
  </header>
)
