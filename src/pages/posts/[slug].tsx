import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import markdown from "markdown-it"
import { getHighlighter } from "shiki"
import { isSupportedLanguage } from "utils/isSupportedLanguage"
import { Layout } from "components/Layout/Layout"
import { Wrapper } from "components/Wrapper/Wrapper"
import { Wysiwyg } from "components/Wysiwyg/Wysiwyg"
import { ThumbnailDummy } from "components/page/posts/ThumbnailDummy"
import { PostMetaItem } from "components/page/posts/PostMetaItem"
import { BlogPostRepository } from "infra/blog-post-repository"
import { PostData } from "components/interface/post-data"
import { getSlug } from "../../utils/getSlug"
import styles from "./[slug].module.css"

const PostPage = ({
  post,
  bodyHtml,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout>
    <div className={styles["post-header-wrapper"]}>
      <div className={styles["post-headers"]}>
        <ThumbnailDummy />
        <h1 className={styles["post-title"]}>{post.title}</h1>
      </div>
      <div className={styles["post-meta-list"]}>
        <PostMetaItem title="Written By" content="sushidesu" />
        <PostMetaItem title="Published At" content="2021/01/01" />
        <PostMetaItem title="Happiness" content="😊 8/10" />
      </div>
    </div>
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
