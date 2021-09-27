import { Header } from "../Header/Header"
import { Footer } from "../Footer/Footer"
import { Container } from "../Container/Container"
import styles from "./Layout.module.css"

export type Props = {
  children?: React.ReactNode
}

export const Layout = ({ children }: Props): JSX.Element => (
  <div className={styles.outer}>
    <Header />
    <main className={styles.main}>
      <Container>{children}</Container>
    </main>
    <Footer />
  </div>
)
