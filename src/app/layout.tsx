import { ReactNode } from "react"
import "../styles/global.css"
import { Layout } from "components/ui/Layout/Layout"
import { Metadata } from "next"

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

export const metadata: Metadata = {
  icons: {
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
    },
    icon: [
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon.ico",
      },
    ],
  },
  manifest: "/site.webmanifest",
  title: {
    default: "sushihack",
    template: "%s | sushihack",
  },
  description: "sushidesu(すし職人)のブログです",
}
