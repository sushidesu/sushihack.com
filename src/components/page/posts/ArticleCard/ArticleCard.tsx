import Link from "next/link"
import styles from "./ArticleCard.module.css"

export type Props = {
  title: string
  path: string
  thumbnailPath?: string
  tags: TagProp[]
}

export type TagProp = {
  id: string
  name: string
  path: string
}

export function ArticleCard({
  title,
  path,
  thumbnailPath,
  tags,
}: Props): JSX.Element {
  return (
    <div className={styles.outer}>
      {thumbnailPath ? (
        <img src={thumbnailPath} />
      ) : (
        <div className={styles.thumbnail_dummy}></div>
      )}
      <div className={styles.inner}>
        <p className={styles.title}>
          <Link href={path} passHref>
            <a>{title}</a>
          </Link>
        </p>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <Link key={tag.id} href={tag.path} passHref>
              <a>
                <span className={styles.tag}>{tag.name}</span>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
