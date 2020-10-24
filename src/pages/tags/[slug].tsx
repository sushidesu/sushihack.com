import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { graphQLClient, gql } from "plugins/graphql"
import { Layout } from "components/Layout"

const TagPage = ({ tag }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout>
    <h1>{tag.label}</h1>
    <ul>
      {tag.posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  </Layout>
)

export const getStaticPaths: GetStaticPaths = async () => {
  const query = gql`
    {
      tags {
        id
        slug
      }
    }
  `

  const { tags } = await graphQLClient.request<{ tags: Tag[] }>(query)
  return {
    paths: tags.map((tag) => ({
      params: {
        slug: tag.slug,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{
  tag: Tag
}> = async ({ params }) => {
  const query = gql`
    query TagPageQuery($slug: String!) {
      tag(where: { slug: $slug }) {
        id
        label
        slug
        posts {
          id
          title
          slug
        }
      }
    }
  `

  const { tag } = await graphQLClient.request<{ tag: Tag }>(query, {
    slug: params?.slug,
  })

  return {
    props: {
      tag,
    },
  }
}

export default TagPage
