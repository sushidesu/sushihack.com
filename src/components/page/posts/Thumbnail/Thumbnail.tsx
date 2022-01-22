import {
  defaultThumbnailPng,
  defaultThumbnailWebp,
} from "constants/default-thumbnail"
import styles from "./Thumbnail.module.css"

type ThumbnailProps = {
  webp?: string | undefined
  png?: string | undefined
  size?: "sm" | "md"
}

export const Thumbnail = (props: ThumbnailProps) => {
  const { webp, png, size = "md" } = props

  return (
    <picture className={styles["wrapper"] + " " + styles[size]}>
      <source srcSet={webp ?? defaultThumbnailWebp} type="image/webp" />
      <img src={png ?? defaultThumbnailPng} />
    </picture>
  )
}
