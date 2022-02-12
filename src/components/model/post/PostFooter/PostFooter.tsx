import Link from "next/link"
import styles from "./PostFooter.module.css"

type PostFooterProps = {
  prevPost?:
    | {
        title: string
        path: string
      }
    | undefined
  nextPost?:
    | {
        title: string
        path: string
      }
    | undefined
}

export const PostFooter = (props: PostFooterProps) => {
  const { prevPost, nextPost } = props

  return (
    <div className={styles["wrapper"]}>
      <div>
        {prevPost && (
          <Link href={prevPost.path} passHref>
            <a className={styles["prev"]}>{`← ${prevPost.title}`}</a>
          </Link>
        )}
      </div>
      <div>
        {nextPost && (
          <Link href={nextPost.path} passHref>
            <a className={styles["next"]}>{`${nextPost.title} →`}</a>
          </Link>
        )}
      </div>
    </div>
  )
}
