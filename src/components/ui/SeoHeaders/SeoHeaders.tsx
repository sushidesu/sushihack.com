import Head from "next/head"
import NexHeadSeo from "next-head-seo"

type SeoHeadersProps = {
  title?: string
  description?: string
  path: string
  ogImagePath?: string
  ogType?: "summary_large_image" | "summary"
  useTitleTemplate?: boolean
}

export const SeoHeaders = (props: SeoHeadersProps): JSX.Element => {
  const {
    title = "sushihack",
    description,
    path,
    ogImagePath = "/ogp.png",
    ogType = "summary_large_image",
    useTitleTemplate = false,
  } = props

  const APP_ROOT_URL = process.env.NEXT_PUBLIC_APP_ROOT_URL

  const pageUrl = APP_ROOT_URL + path
  const ogImageUrl = APP_ROOT_URL + ogImagePath

  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="favicon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <NexHeadSeo
        title={useTitleTemplate ? `${title} - sushihack` : title}
        canonical={pageUrl}
        description={description}
        og={{
          title,
          description,
          url: pageUrl,
          image: ogImageUrl,
          type: "article",
        }}
        twitter={{
          card: ogType,
        }}
      />
    </>
  )
}
