import Link from "next/link"
import { Thumbnail } from "components/model/post/Thumbnail"
import { Tag } from "components/model/tag/Tag"
import { formatDate } from "utils/format-date"
import styles from "./ArticleCard.module.css"

export type Props = {
  title: string
  publishedAt: string
  path: string
  thumbnailWebp?: string | undefined
  thumbnailPng?: string | undefined
  tags: TagProp[]
}

export type TagProp = {
  id: string
  name: string
  path: string
}

export function ArticleCard({
  title,
  publishedAt,
  path,
  thumbnailWebp,
  thumbnailPng,
  tags,
}: Props): JSX.Element {
  return (
    <div className={styles.outer}>
      {/* thumbnail */}
      <div className={styles["thumbnail"]}>
        <Thumbnail size="sm" webp={thumbnailWebp} png={thumbnailPng} />
      </div>
      {/* content */}
      <div className={styles.inner}>
        {/* title */}
        <p className={styles.title}>
          <Link href={path} passHref>
            <a>{title}</a>
          </Link>
        </p>
        {/* details */}
        <div className={styles["details"]}>
          <div className={styles.tags}>
            {tags.map((tag) => (
              <Link key={tag.id} href={tag.path} passHref>
                <a>
                  <Tag>{tag.name}</Tag>
                </a>
              </Link>
            ))}
          </div>
          <div className={styles["published_at"]}>
            <p>{formatDate(publishedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
