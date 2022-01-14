import styles from "./PostMetaItem.module.css"

type PostMetaItemProps = {
  title: string
  content: string
  icon?: React.ReactNode
}

export const PostMetaItem = (props: PostMetaItemProps) => {
  const { title, content, icon } = props
  return (
    <div className={styles["post-meta-item"]}>
      {icon ? (
        <div className={styles["post-meta-item-icon"]}>{icon}</div>
      ) : null}
      <div className={styles["post-meta-item-body"]}>
        <p className={styles["post-meta-item-title"]}>{title}</p>
        <p className={styles["post-meta-item-content"]}>{content}</p>
      </div>
    </div>
  )
}
