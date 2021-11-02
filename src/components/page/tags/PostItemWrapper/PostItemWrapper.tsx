type PostItemWrapperProps = {
  items: JSX.Element[]
}

export function PostItemWrapper({ items }: PostItemWrapperProps): JSX.Element {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}
