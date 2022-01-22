import React from "react"
import { InferGetStaticPropsType, GetStaticProps } from "next"
import { SeoHeaders } from "components/ui/SeoHeaders"
import { Layout } from "components/Layout/Layout"
import { Wrapper } from "components/Wrapper/Wrapper"
import { ArticleCard } from "components/page/posts/ArticleCard/ArticleCard"
import { ArticleCardWrapper } from "components/page/posts/ArticleCardWrapper/ArticleCardWrapper"
import { PostData } from "../components/interface/post-data"
import { BlogPostRepository } from "../infra/blog-post-repository"

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
      <SeoHeaders title="sushihack" path="/" />

      <Wrapper>
        <section>
          <ArticleCardWrapper>
            {posts.map(
              ({ id, title, thumbnail_png, thumbnail_webp, slug, tags }) => (
                <ArticleCard
                  key={id}
                  title={title}
                  path={`/posts/${slug}`}
                  thumbnailPng={thumbnail_png ?? undefined}
                  thumbnailWebp={thumbnail_webp ?? undefined}
                  tags={tags.map(({ id, label, slug }) => ({
                    id,
                    name: label,
                    path: `/tags/${slug}`,
                  }))}
                />
              )
            )}
          </ArticleCardWrapper>
        </section>
      </Wrapper>
    </Layout>
  )
}

export default Home
