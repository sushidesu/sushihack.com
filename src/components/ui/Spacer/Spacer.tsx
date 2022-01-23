import styles from "./Spacer.module.css"

type SpacerProps = {
  size?: "sm" | "md" | "lg"
}

export function Spacer({ size = "md" }: SpacerProps): JSX.Element {
  return <div className={styles[size]} />
}
