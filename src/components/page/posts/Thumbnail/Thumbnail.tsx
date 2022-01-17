import styles from "./Thumbnail.module.css"

type ThumbnailProps = {
  webp?: string | undefined
  png?: string | undefined
}

export const Thumbnail = (props: ThumbnailProps) => {
  const { webp, png } = props

  if (webp && png) {
    return (
      <picture className={styles["wrapper"]}>
        <source srcSet={webp} type="image/webp" />
        <img src={png} />
      </picture>
    )
  } else {
    return <div className={styles["dummy"]} />
  }
}
