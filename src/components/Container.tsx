import clsx from "clsx"

export type Props = {
  children?: React.ReactNode
}

export function Container({ children }: Props): JSX.Element {
  return (
    <div className={clsx("max-w-screen-md", "my-0", "mx-auto", "py-0", "px-3")}>
      {children}
    </div>
  )
}
