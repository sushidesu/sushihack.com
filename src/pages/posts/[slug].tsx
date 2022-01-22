import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import markdown from "markdown-it"
import { getHighlighter } from "shiki"
import { isSupportedLanguage } from "utils/isSupportedLanguage"
import { Layout } from "components/Layout/Layout"
import { Wrapper } from "components/Wrapper/Wrapper"
import { Wysiwyg } from "components/Wysiwyg/Wysiwyg"
import { BlogPostRepository } from "infra/blog-post-repository"
import { PostData } from "components/interface/post-data"
import { getSlug } from "utils/getSlug"
import { PostHeader } from "components/page/posts/PostHeader"
import { SeoHeaders } from "components/ui/SeoHeaders"
import styles from "./[slug].module.css"

const genDefaultOgpPath = (root: string) => `${root}/square_salmon.png`

const PostPage = ({
  post,
  bodyHtml,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout>
    <SeoHeaders
      title={post.title}
      path={`/posts/${post.slug}`}
      ogImagePath={post.thumbnail_ogp ?? genDefaultOgpPath}
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
    <Wrapper>
      <Wysiwyg>
        <div dangerouslySetInnerHTML={{ __html: bodyHtml }}></div>
      </Wysiwyg>
    </Wrapper>
  </Layout>
)

export const getStaticPaths: GetStaticPaths = async () => {
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

export const getStaticProps: GetStaticProps<{
  post: PostData
  bodyHtml: string
}> = async ({ params }) => {
  const postRepository = new BlogPostRepository()
  const slug = getSlug(params)
  const post = await postRepository.getPost(slug)

  const highlighter = await getHighlighter({ theme: "material-theme-lighter" })
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
  })
  const bodyHtml = md.render(post.body)

  return {
    props: {
      post,
      bodyHtml,
    },
  }
}

export default PostPage
