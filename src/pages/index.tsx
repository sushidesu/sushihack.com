import React from "react"
import { InferGetStaticPropsType, GetStaticProps } from "next"
import Head from "next/head"
import NextLink from "next/link"
import clsx from "clsx"
import { graphQLClient, gql } from "plugins/graphql"
import { Grid, Card, Link, Tag, Spacer } from "@geist-ui/react"
import { Layout } from "components/Layout"

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  const query = gql`
    {
      posts {
        id
        slug
        title
        tags {
          id
          label
          slug
        }
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

      <section className={clsx("py-5")}>
        <Grid.Container gap={2} justify="center">
          {posts.map((post) => (
            <Grid xs={24} md={12} key={post.id}>
              <Card shadow>
                <div className={clsx("flex", "justify-between")}>
                  <Dummy />
                  <div style={{ flex: "1 1 auto" }}>
                    <NextLink
                      passHref
                      href={"/posts/[slug]"}
                      as={`/posts/${post.slug}`}
                    >
                      <Link>
                        <h2 className={clsx("text-xl")}>{post.title}</h2>
                      </Link>
                    </NextLink>
                    <Spacer y={0.5} />
                    <div className={clsx("flex")}>
                      {post.tags.map((tag) => (
                        <React.Fragment key={tag.id}>
                          <Tag type="warning">
                            <NextLink
                              passHref
                              href={`/tags/[slug]`}
                              as={`/tags/${tag.slug}`}
                            >
                              <Link>{tag.label}</Link>
                            </NextLink>
                          </Tag>
                          <Spacer x={0.5} />
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid.Container>
      </section>
    </Layout>
  )
}

function Dummy(): JSX.Element {
  return (
    <div
      className={clsx("bg-blue-200", "w-20", "h-20", "rounded-sm", "mr-3")}
    />
  )
}

export default Home
