import styles from "./Wysiwyg.module.css"

export type Props = {
  children?: React.ReactNode
  contentHTML?: string
}

export function Wysiwyg({ children, contentHTML }: Props): JSX.Element {
  return (
    <div
      className={styles.outer}
      dangerouslySetInnerHTML={
        contentHTML ? { __html: contentHTML } : undefined
      }
    >
      {children}
    </div>
  )
}
