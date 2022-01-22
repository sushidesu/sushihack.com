import styles from "./Avatar.module.css"

type AvatarProps = {
  src: string
  name?: string
  size: string
}

export const Avatar = (props: AvatarProps) => {
  const { src, size, name } = props
  return (
    <img
      className={styles["wrapper"]}
      style={{ width: size, height: size }}
      alt={name}
      src={src}
    />
  )
}
