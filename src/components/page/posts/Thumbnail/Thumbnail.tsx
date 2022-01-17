import styles from "./Thumbnail.module.css"

type ThumbnailProps = {
  webp?: string | undefined
  png?: string | undefined
  size?: "sm" | "md"
}

export const Thumbnail = (props: ThumbnailProps) => {
  const { webp, png, size = "md" } = props

  if (webp && png) {
    return (
      <picture className={styles["wrapper"] + " " + styles[size]}>
        <source srcSet={webp} type="image/webp" />
        <img src={png} />
      </picture>
    )
  } else {
    return <div className={styles["dummy"] + " " + styles[size]} />
  }
}
