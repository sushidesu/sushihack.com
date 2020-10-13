import { InferGetStaticPropsType, GetStaticProps } from "next"
import Head from "next/head"
import NextLink from "next/link"
import { graphQLClient, gql } from "plugins/graphql"
import { Grid, Card, Link } from "@geist-ui/react"
import { Layout } from "components/Layout"

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

      <Grid.Container gap={2} justify="center">
        {posts.map((post) => (
          <Grid xs={24} md={12} key={post.id}>
            <Card shadow>
              <NextLink
                passHref
                href={"/post/[slug]"}
                as={`/post/${post.slug}`}
              >
                <Link>
                  <h2>{post.title}</h2>
                </Link>
              </NextLink>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </Layout>
  )
}

export default Home
