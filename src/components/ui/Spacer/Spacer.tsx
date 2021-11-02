type SpacerProps = {
  size?: string
}

export function Spacer({ size = "1em" }: SpacerProps): JSX.Element {
  return (
    <span
      style={{
        margin: size,
      }}
    />
  )
}
