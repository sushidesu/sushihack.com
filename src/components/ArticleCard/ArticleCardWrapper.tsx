import styles from "./ArticleCardWrapper.module.css"

export type Props = {
  children?: React.ReactNode
}

export function ArticleCardWrapper({ children }: Props): JSX.Element {
  return <div className={styles.outer}>{children}</div>
}
