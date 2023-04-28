import { ArticleCard } from "components/model/post/ArticleCard/ArticleCard"
import { ArticleCardWrapper } from "components/model/post/ArticleCardWrapper/ArticleCardWrapper"
import { BlogPostRepository } from "../infra/blog-post-repository"

export default async function HomePage(): Promise<JSX.Element> {
  const blogPostRepository = new BlogPostRepository()
  const posts = await blogPostRepository.getAllPosts()
  return (
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
  )
}
