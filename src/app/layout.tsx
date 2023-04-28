import { ReactNode } from "react"
import { Layout } from "components/ui/Layout/Layout"
import { Wrapper } from "components/ui/Wrapper/Wrapper"
import "../styles/global.css"

export default function RootLayout({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  return (
    <html lang={"ja"}>
      <body>
        <Layout>
          <Wrapper>{children}</Wrapper>
        </Layout>
      </body>
    </html>
  )
}
