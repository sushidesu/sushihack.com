import React from "react"
import { InferGetStaticPropsType, GetStaticProps } from "next"
import Head from "next/head"
import { PostData } from "../components/interface/post-data"
import { BlogPostRepository } from "../infra/blog-post-repository"
import { Layout } from "components/Layout/Layout"
import { Wrapper } from "components/Wrapper/Wrapper"
import { ArticleCard } from "components/ArticleCard/ArticleCard"
import { ArticleCardWrapper } from "components/ArticleCard/ArticleCardWrapper"

export const getStaticProps: GetStaticProps<{
  posts: PostData[]
}> = async () => {
  const postRepository = new BlogPostRepository()
  const posts = await postRepository.getAllPosts()

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
        <title>sushihack</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Wrapper>
        <section>
          <ArticleCardWrapper>
            {posts.map(({ id, title, slug, tags }) => (
              <ArticleCard
                key={id}
                title={title}
                path={`/posts/${slug}`}
                tags={tags.map(({ id, label, slug }) => ({
                  id,
                  name: label,
                  path: `/tags/${slug}`,
                }))}
              />
            ))}
          </ArticleCardWrapper>
        </section>
      </Wrapper>
    </Layout>
  )
}

export default Home
