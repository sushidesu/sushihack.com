import Link from "next/link"
import styles from "./PostItem.module.css"

type PostItemProps = {
  title: string
  path: string
}

export function PostItem({ title, path }: PostItemProps): JSX.Element {
  return (
    <div>
      <p className={styles.postTitle}>
        <Link href={path}>{title}</Link>
      </p>
    </div>
  )
}
