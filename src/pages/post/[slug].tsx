import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import marked from "marked"
import { getHighlighter } from "shiki"
import { graphQLClient, gql } from "../../plugins/graphql"
import { isSupportedLanguage } from "../../utils/isSupportedLanguage"
import { Layout } from "../../components/Layout"

const PostPage = ({
  post,
  bodyHtml,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout>
    <h1>{post.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: bodyHtml }}></div>
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
  const bodyHtml = marked(post.body, {
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

  return {
    props: {
      post,
      bodyHtml,
    },
  }
}

export default PostPage
