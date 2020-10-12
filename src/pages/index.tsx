import { InferGetStaticPropsType, GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { graphQLClient, gql } from "../plugins/graphql"
import { Layout } from "../components/Layout"

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
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

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={"/post/[slug]"} as={`/post/${post.slug}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default Home
