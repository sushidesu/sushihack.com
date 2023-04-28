import Link from "next/link"
import styles from "./PostFooter.module.css"

type PostFooterProps = {
  prevPost?:
    | {
        title: string
        slug: string
      }
    | undefined
  nextPost?:
    | {
        title: string
        slug: string
      }
    | undefined
}

export const PostFooter = (props: PostFooterProps) => {
  const { prevPost, nextPost } = props

  return (
    <div className={styles["wrapper"]}>
      <div>
        {prevPost && (
          <Link href={`/posts/${prevPost.slug}`} className={styles["prev"]}>
            {`← ${prevPost.title}`}
          </Link>
        )}
      </div>
      <div>
        {nextPost && (
          <Link href={`/posts/${nextPost.slug}`} className={styles["next"]}>
            {`${nextPost.title} →`}
          </Link>
        )}
      </div>
    </div>
  )
}
