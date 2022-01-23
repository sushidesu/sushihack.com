import styles from "./Tag.module.css"

type TagProps = {
  children: string
}

export const Tag = (props: TagProps): JSX.Element => {
  const { children } = props
  return (
    <div className={styles["wrapper"]}>
      <p>{children}</p>
    </div>
  )
}
