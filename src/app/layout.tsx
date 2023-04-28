import { ReactNode } from "react"
import "../styles/global.css"
import { Layout } from "components/ui/Layout/Layout"

export default function RootLayout({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  return (
    <html lang={"ja"}>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
