import { GetStaticPaths, Metadata } from "next"
import { TagDataWithPosts } from "components/interface/tag-data"
import { List } from "components/ui/List/List"
import { Spacer } from "components/ui/Spacer"
import { PostItem } from "components/model/tag/PostItem/PostItem"
import { BlogPostRepository } from "infra/blog-post-repository"
import { SeoHeaders } from "components/ui/SeoHeaders"
import { Wrapper } from "components/ui/Wrapper/Wrapper"
import { Container } from "components/ui/Container/Container"
import { PageProps } from "../../../../.next/types/app/page"
import { format } from "util"
import { titleTemplate } from "constants/title-template"

const Tag = ({ tag }: { tag: TagDataWithPosts }) => (
  <Container>
    <Wrapper>
      <SeoHeaders
        title={`Tag: ${tag.label}`}
        path={`/tags/${tag.slug}`}
        useTitleTemplate
      />
      <h1>{`Tag: ${tag.label}`}</h1>
      <Spacer size="md" />
      <List
        items={tag.posts.map((post) => (
          <PostItem title={post.title} path={`/posts/${post.slug}`} />
        ))}
      />
    </Wrapper>
  </Container>
)

const getStaticPaths: GetStaticPaths = async () => {
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

export default async function TagPage(props: {
  params: Record<string, unknown>
}) {
  const slug = props.params.slug
  if (typeof slug !== "string") {
    throw new Error("invalid url")
  }
  const postRepository = new BlogPostRepository()
  const tag = await postRepository.getTagWithPosts(slug)

  return <Tag tag={tag} />
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  if (typeof slug !== "string") {
    throw new Error("invalid url")
  }

  const postRepository = new BlogPostRepository()
  const tag = await postRepository.getTagWithPosts(slug)
  const title = `Tag: ${tag.label}`

  return {
    title,
    description: "",
    twitter: {
      card: "summary",
    },
    openGraph: {
      url: `/tags/${tag.slug}`,
      title: format(titleTemplate, title),
      images: ["/square_salmon.png"],
      type: "article",
      description: "",
    },
  }
}
