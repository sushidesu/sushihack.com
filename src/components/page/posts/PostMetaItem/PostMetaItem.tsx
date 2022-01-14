import { parseISO, format } from "date-fns"
import styles from "./PostMetaItem.module.css"

type PostMetaItemProps = {
  title: string
  content?: string
  time?: string
  icon?: React.ReactNode
}

export const PostMetaItem = (props: PostMetaItemProps) => {
  const { title, content, time, icon } = props
  return (
    <div className={styles["post-meta-item"]}>
      {icon ? (
        <div className={styles["post-meta-item-icon"]}>{icon}</div>
      ) : null}
      <div className={styles["post-meta-item-body"]}>
        <p className={styles["post-meta-item-title"]}>{title}</p>
        {content ? (
          <p className={styles["post-meta-item-content"]}>{content}</p>
        ) : null}
        {time ? (
          <time dateTime={time}>{format(parseISO(time), "yyyy/MM/dd")}</time>
        ) : null}
      </div>
    </div>
  )
}
