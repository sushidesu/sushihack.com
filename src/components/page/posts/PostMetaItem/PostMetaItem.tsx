import styles from "./PostMetaItem.module.css"

type PostMetaItemProps = {
  title: string
  content: string
}

export const PostMetaItem = (props: PostMetaItemProps) => {
  const { title, content } = props
  return (
    <div className={styles["post-meta-item"]}>
      <p className={styles["post-meta-item-title"]}>{title}</p>
      <p className={styles["post-meta-item-content"]}>{content}</p>
    </div>
  )
}
