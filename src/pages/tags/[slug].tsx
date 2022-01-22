import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { Layout } from "components/Layout/Layout"
import { TagDataWithPosts } from "components/interface/tag-data"
import { List } from "components/ui/List/List"
import { Spacer } from "components/ui/Spacer/Spacer"
import { PostItem } from "components/model/tags/PostItem/PostItem"
import { BlogPostRepository } from "../../infra/blog-post-repository"
import { getSlug } from "../../utils/getSlug"
import { SeoHeaders } from "components/ui/SeoHeaders"

const TagPage = ({ tag }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout>
    <SeoHeaders
      title={`Tag: ${tag.label}`}
      path={`/tags/${tag.slug}`}
      useTitleTemplate
    />
    <h1>{tag.label}</h1>
    <Spacer size="1em" />
    <List
      items={tag.posts.map((post) => (
        <PostItem title={post.title} path={`/posts/${post.slug}`} />
      ))}
    />
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
