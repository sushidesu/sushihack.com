import Link from "next/link"
import { Thumbnail } from "components/model/post/Thumbnail"
import { Tag } from "components/model/tag/Tag"
import styles from "./ArticleCard.module.css"

export type Props = {
  title: string
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
  path,
  thumbnailWebp,
  thumbnailPng,
  tags,
}: Props): JSX.Element {
  return (
    <div className={styles.outer}>
      <Thumbnail size="sm" webp={thumbnailWebp} png={thumbnailPng} />
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
                <Tag>{tag.name}</Tag>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
