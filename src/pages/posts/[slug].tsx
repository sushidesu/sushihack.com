import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import markdown from "markdown-it"
import { getHighlighter } from "shiki"
import { isSupportedLanguage } from "utils/isSupportedLanguage"
import { Layout } from "components/ui/Layout/Layout"
import { Wrapper } from "components/ui/Wrapper/Wrapper"
import { Wysiwyg } from "components/ui/Wysiwyg/Wysiwyg"
import { Spacer } from "components/ui/Spacer"
import { BlogPostRepository } from "infra/blog-post-repository"
import { PostData } from "components/interface/post-data"
import { getSlug } from "utils/getSlug"
import { PostHeader } from "components/model/post/PostHeader"
import { SeoHeaders } from "components/ui/SeoHeaders"
import { PostFooter } from "components/model/post/PostFooter"

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
            <PostFooter prevPost={post.prevPost} nextPost={post.nextPost} />
          </nav>
          <Spacer size="lg" />
        </>
      )}
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

  return {
    props: {
      post,
      bodyHtml,
    },
  }
}

export default PostPage
