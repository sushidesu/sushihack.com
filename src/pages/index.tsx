import { InferGetStaticPropsType, GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { GraphQLClient, gql } from "graphql-request"
import { Layout } from "../components/Layout"

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  const graphQLClient = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)

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
    props: {
      posts,
    },
  }
}

const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={"/post/[slug]"} as={`/post/${post.slug}`}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  )
}

export default Home
