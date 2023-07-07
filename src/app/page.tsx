import { Metadata } from "next"
import { ArticleCard } from "components/model/post/ArticleCard/ArticleCard"
import { ArticleCardWrapper } from "components/model/post/ArticleCardWrapper/ArticleCardWrapper"
import { BlogPostRepository } from "../infra/blog-post-repository"
import { Container } from "components/ui/Container/Container"
import { Wrapper } from "components/ui/Wrapper/Wrapper"
import { defaultDescription, defaultTitle } from "constants/default-metadata"

export default async function HomePage(): Promise<JSX.Element> {
  const blogPostRepository = new BlogPostRepository()
  const posts = await blogPostRepository.getAllPosts()
  return (
    <Container>
      <Wrapper>
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
      </Wrapper>
    </Container>
  )
}

export const metadata: Metadata = {
  title: defaultTitle,
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "/",
    title: defaultTitle,
    images: "/ogp.png",
    type: "article",
    description: defaultDescription,
  },
}
