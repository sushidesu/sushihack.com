import Link from "next/link"
import { Container } from "../Container/Container"
import Logo from "./salmon_with_text.svg"
import styles from "./Header.module.css"

export const Header = (): JSX.Element => (
  <header className={styles.outer}>
    <Container>
      <div className={styles.inner}>
        <p>
          <Link passHref href="/">
            <a className={styles.logo}>
              <Logo height={"40px"} />
            </a>
          </Link>
        </p>
        <p>
          <Link passHref href="/about">
            <a className={styles.about}>About</a>
          </Link>
        </p>
      </div>
    </Container>
  </header>
)
