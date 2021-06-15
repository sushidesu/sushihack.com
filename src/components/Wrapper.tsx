import clsx from "clsx"
import { Children, ReactNode } from "react"

export type Props = {
  children?: ReactNode
  py?: boolean
  px?: boolean
}

export function Wrapper({ children, py, px }: Props): JSX.Element {
  return (
    <div className={clsx("bg-white", py && "py-2", px && "px-4", "rounded-md")}>
      {children}
    </div>
  )
}
