import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { Layout } from "components/Layout/Layout"
import { TagDataWithPosts } from "components/interface/tag-data"
import { PostItem } from "components/page/tags/PostItem/PostItem"
import { BlogPostRepository } from "../../infra/blog-post-repository"
import { getSlug } from "../../utils/getSlug"

const TagPage = ({ tag }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout>
    <h1>{tag.label}</h1>
    <ul>
      {tag.posts.map((post) => (
        <li key={post.id}>
          <PostItem title={post.title} path={`/posts/${post.slug}`} />
        </li>
      ))}
    </ul>
  </Layout>
)

export const getStaticPaths: GetStaticPaths = async () => {
  const postRepository = new BlogPostRepository()
  const tags = await postRepository.getAllTags()
  return {
    paths: tags.map((tag) => ({
      params: {
        slug: tag.slug,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{
  tag: TagDataWithPosts
}> = async ({ params }) => {
  const slug = getSlug(params)
  const postRepository = new BlogPostRepository()
  const tag = await postRepository.getTagWithPosts(slug)

  return {
    props: {
      tag,
    },
  }
}

export default TagPage
