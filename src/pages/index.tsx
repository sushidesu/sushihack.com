import React from "react"
import { InferGetStaticPropsType, GetStaticProps } from "next"
import { SeoHeaders } from "components/ui/SeoHeaders"
import { Layout } from "components/ui/Layout/Layout"
import { Wrapper } from "components/ui/Wrapper/Wrapper"
import { ArticleCard } from "components/model/post/ArticleCard/ArticleCard"
import { ArticleCardWrapper } from "components/model/post/ArticleCardWrapper/ArticleCardWrapper"
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
      <SeoHeaders
        title="sushihack"
        description={"(すし職人)sushidesuのブログ"}
        path="/"
      />

      <Wrapper>
        <section>
          <ArticleCardWrapper>
            {posts.map(
              ({
                id,
                title,
                publishedAt,
                thumbnail_png,
                thumbnail_webp,
                slug,
                tags,
              }) => (
                <ArticleCard
                  key={id}
                  title={title}
                  publishedAt={publishedAt}
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
