import React from "react"
import { InferGetStaticPropsType, GetStaticProps } from "next"
import Head from "next/head"
import clsx from "clsx"
import { graphQLClient, gql } from "plugins/graphql"
import { Layout } from "components/Layout"
import { ArticleCard } from "components/ArticleCard"

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
        <div className={clsx("space-y-6")}>
          {posts.map((post) => (
            <ArticleCard
              key={post.id}
              title={post.title}
              path={`/posts/${post.slug}`}
              tags={post.tags.map((tag) => ({
                id: tag.id,
                name: tag.label,
                path: `/tags/${tag.slug}`,
              }))}
            />
          ))}
        </div>
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
