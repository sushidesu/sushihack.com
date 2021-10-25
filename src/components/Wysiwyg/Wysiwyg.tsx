import styles from "./Wysiwyg.module.css"

export type Props = {
  children?: React.ReactNode
}

export function Wysiwyg({ children }: Props): JSX.Element {
  return <div className={styles.outer}>{children}</div>
}
