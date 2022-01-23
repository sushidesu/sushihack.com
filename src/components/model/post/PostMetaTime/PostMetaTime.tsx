import { formatDate } from "utils/format-date"
import styles from "./PostMetaTime.module.css"

type PostMetaTimeProps = {
  isoTimeString: string
}

export const PostMetaTime = (props: PostMetaTimeProps): JSX.Element => {
  const { isoTimeString } = props
  return (
    <p className={styles["wrapper"]}>
      <time dateTime={isoTimeString}>{formatDate(isoTimeString)}</time>
    </p>
  )
}
