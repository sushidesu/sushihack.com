import React from "react"
import { InferGetStaticPropsType, GetStaticProps } from "next"
import Head from "next/head"
import NextLink from "next/link"
import clsx from "clsx"
import { graphQLClient, gql } from "plugins/graphql"
import { Grid } from "@geist-ui/react"
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
              <div className={clsx("shadow-md", "px-3", "py-4")}>
                <div className={clsx("flex", "justify-between")}>
                  <Dummy />
                  <div style={{ flex: "1 1 auto" }}>
                    <h2 className={clsx("text-xl")}>
                      <NextLink
                        passHref
                        href={"/posts/[slug]"}
                        as={`/posts/${post.slug}`}
                      >
                        <a>{post.title}</a>
                      </NextLink>
                    </h2>
                    <div className={clsx("flex", "mt-3")}>
                      {post.tags.map((tag) => (
                        <React.Fragment key={tag.id}>
                          <span
                            className={clsx(
                              "border",
                              "border-yellow-400",
                              "rounded-sm",
                              "px-1.5",
                              "py-0.5",
                              "mr-3"
                            )}
                          >
                            <NextLink
                              passHref
                              href={`/tags/[slug]`}
                              as={`/tags/${tag.slug}`}
                            >
                              <a>{tag.label}</a>
                            </NextLink>
                          </span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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
