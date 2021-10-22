import Link from "next/link"
import { Container } from "../Container/Container"
import styles from "./Header.module.css"

export const Header = (): JSX.Element => (
  <header className={styles.outer}>
    <Container>
      <div className={styles.inner}>
        <p>
          <Link href="/">
            <a className={styles.logo}>sushihack</a>
          </Link>
        </p>
        <p className={styles.about}>
          <Link href="/about">About</Link>
        </p>
      </div>
    </Container>
  </header>
)
