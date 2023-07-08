import { GetStaticPaths, Metadata } from "next"
import markdown from "markdown-it"
import { getHighlighter } from "shiki"
import { isSupportedLanguage } from "utils/isSupportedLanguage"
import { Wrapper } from "components/ui/Wrapper/Wrapper"
import { Wysiwyg } from "components/ui/Wysiwyg/Wysiwyg"
import { Spacer } from "components/ui/Spacer"
import { BlogPostRepository } from "infra/blog-post-repository"
import { PostData } from "components/interface/post-data"
import { PostHeader } from "components/model/post/PostHeader"
import { SeoHeaders } from "components/ui/SeoHeaders"
import { PostFooter } from "components/model/post/PostFooter"
import { PageProps } from "../../../../.next/types/app/page"
import { Container } from "components/ui/Container/Container"
import { format } from "util"
import { titleTemplate } from "constants/title-template"

const genDefaultOgpPath = (root: string) => `${root}/square_salmon.png`

type PostProps = {
  post: PostData
  bodyHtml: string
}

const Post = ({ post, bodyHtml }: PostProps) => (
  <Container>
    <SeoHeaders
      title={post.title}
      path={`/posts/${post.slug}`}
      ogImagePath={post.thumbnail_ogp ?? genDefaultOgpPath}
      ogType="summary"
      useTitleTemplate
    />
    <PostHeader
      title={post.title}
      avatar="https://avatars.githubusercontent.com/u/45958851?s=96&v=4"
      publishedAt={post.publishedAt}
      thumbnail={{
        webp: post.thumbnail_webp ?? undefined,
        png: post.thumbnail_png ?? undefined,
      }}
    />
    <Spacer size="sm" />
    <Wrapper>
      <Wysiwyg contentHTML={bodyHtml} />
      <Spacer size="lg" />
      {(post.prevPost || post.nextPost) && (
        <>
          <nav>
            <PostFooter
              prevPost={post.prevPost ?? undefined}
              nextPost={post.nextPost ?? undefined}
            />
          </nav>
          <Spacer size="lg" />
        </>
      )}
    </Wrapper>
  </Container>
)

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  const postRepository = new BlogPostRepository()
  const posts = await postRepository.getAllPostsSmall()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

const getStaticPaths: GetStaticPaths = async () => {
  const postRepository = new BlogPostRepository()
  const posts = await postRepository.getAllPostsSmall()
  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  }
}

export default async function PostPage(props: PageProps) {
  const slug = props.params.slug
  if (typeof slug !== "string") {
    throw new Error("invalid url")
  }

  const postRepository = new BlogPostRepository()
  const post = await postRepository.getPost(slug)

  const highlighter = await getHighlighter({ theme: "material-lighter" })
  const md = markdown({
    html: true,
    highlight: (code, lang) => {
      if (!highlighter.codeToHtml) {
        throw new Error()
      }
      if (isSupportedLanguage(lang)) {
        return highlighter.codeToHtml(code, lang)
      } else {
        return code
      }
    },
    linkify: true,
  })

  md.linkify.set({
    fuzzyLink: true,
  })

  const bodyHtml = md.render(post.body)

  return <Post post={post} bodyHtml={bodyHtml} />
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = params.slug
  if (typeof slug !== "string") {
    throw new Error("invalid url")
  }

  const postRepository = new BlogPostRepository()
  const post = await postRepository.getPost(slug)

  return {
    title: post.title,
    description: "",
    twitter: {
      card: "summary",
    },
    openGraph: {
      url: `/posts/${post.slug}`,
      title: format(titleTemplate, post.title),
      images: [post.thumbnail_ogp ?? "/square_salmon.png"],
      type: "article",
      description: undefined,
    },
  }
}
