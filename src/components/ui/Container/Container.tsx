import styles from "./Container.module.css"

export type Props = {
  children?: React.ReactNode
}

export function Container({ children }: Props): JSX.Element {
  return <div className={styles.outer}>{children}</div>
}
