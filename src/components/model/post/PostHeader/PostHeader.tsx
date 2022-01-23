import { PostMetaTime } from "components/model/post/PostMetaTime"
import { Thumbnail } from "components/model/post/Thumbnail"
import styles from "./PostHeader.module.css"

type PostHeaderProps = {
  title: string
  avatar: string
  publishedAt: string
  thumbnail: {
    webp: string | undefined
    png: string | undefined
  }
}

export const PostHeader = (props: PostHeaderProps): JSX.Element => {
  const { title, avatar, publishedAt, thumbnail } = props
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["post-headers"]}>
        <Thumbnail webp={thumbnail.webp} png={thumbnail.png} />
        <h1 className={styles["post-title"]}>{title}</h1>
      </div>
      <div className={styles["post-meta-list"]}>
        <PostMetaTime isoTimeString={publishedAt} />
      </div>
    </div>
  )
}
