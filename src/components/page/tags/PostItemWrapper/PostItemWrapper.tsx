import styles from "./PostItemWrapper.module.css"

type PostItemWrapperProps = {
  items: JSX.Element[]
}

export function PostItemWrapper({ items }: PostItemWrapperProps): JSX.Element {
  return (
    <ul>
      {items.map((item, index) => (
        <li className={styles.listItem} key={index}>
          {item}
        </li>
      ))}
    </ul>
  )
}
