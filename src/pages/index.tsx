import { InferGetStaticPropsType, GetStaticProps } from "next"
import Head from "next/head"
import NextLink from "next/link"
import { graphQLClient, gql } from "plugins/graphql"
import styled from "@emotion/styled"
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

      <Section>
        <Grid.Container gap={2} justify="center">
          {posts.map((post) => (
            <Grid xs={24} md={12} key={post.id}>
              <Card shadow>
                <Flex>
                  <Dummy />
                  <NextLink
                    passHref
                    href={"/posts/[slug]"}
                    as={`/posts/${post.slug}`}
                  >
                    <Link>
                      <Title>{post.title}</Title>
                    </Link>
                  </NextLink>
                </Flex>
              </Card>
            </Grid>
          ))}
        </Grid.Container>
      </Section>
    </Layout>
  )
}

const Section = styled.section`
  padding: 3rem 0;
`

const Dummy = styled.span`
  display: block;
  background-color: #bde;
  width: 80px;
  height: 80px;
  border-radius: 0.4rem;
`

const Flex = styled.div`
  display: flex;
  justify-content: space-between;

  & > a {
    flex: 1 1 auto;
  }
`

const Title = styled.h2`
  margin: 0 0 0 0.8em;
  font-size: 1.6rem;
`

export default Home
