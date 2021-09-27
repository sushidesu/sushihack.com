import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import markdown from "markdown-it"
import { getHighlighter } from "shiki"
import { graphQLClient, gql } from "plugins/graphql"
import { isSupportedLanguage } from "utils/isSupportedLanguage"
import { Layout } from "components/Layout/Layout"
import { Wrapper } from "components/Wrapper/Wrapper"
import { Wysiwyg } from "components/Wysiwyg"

const PostPage = ({
  post,
  bodyHtml,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout>
    <Wrapper>
      <h1>{post.title}</h1>
      <Wysiwyg>
        <div dangerouslySetInnerHTML={{ __html: bodyHtml }}></div>
      </Wysiwyg>
    </Wrapper>
  </Layout>
)

export const getStaticPaths: GetStaticPaths = async () => {
  const query = gql`
    {
      posts {
        id
        slug
        title
      }
    }
  `
  const { posts } = await graphQLClient.request<{ posts: Post[] }>(query)
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
  post: Post
  bodyHtml: string
}> = async ({ params }) => {
  const query = gql`
    query PostPageQuery($slug: String!) {
      post(where: { slug: $slug }) {
        id
        title
        body
      }
    }
  `
  const { post } = await graphQLClient.request<{ post: Post }>(query, {
    slug: params?.slug,
  })

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
