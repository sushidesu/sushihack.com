import styles from "./List.module.css"

type ListProps = {
  items: JSX.Element[]
}

export function List({ items }: ListProps): JSX.Element {
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
