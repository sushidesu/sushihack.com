import { ReactNode } from "react"
import { Wrapper } from "components/ui/Wrapper/Wrapper"
import { Container } from "components/ui/Container/Container"
import { Metadata } from "next"
import { titleTemplate } from "constants/title-template"
import { format } from "util"

export default function RootLayout({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>
  )
}

export const metadata: Metadata = {
  title: "About",
  description: "",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "/",
    title: format(titleTemplate, "About"),
    images: "/ogp.png",
    type: "article",
    description: "",
  },
  alternates: {
    canonical: "/about",
  },
}
