interface GraphCMSModel {
  id: string
}

export interface PostModel extends GraphCMSModel {
  slug: string
  publishedAt: string
  title: string
  body: string
  tags: TagModel[]
  thumbnail_webp: {
    url: string
  } | null
  thumbnail_png: {
    url: string
  } | null
}

export interface TagModel extends GraphCMSModel {
  slug: string
  label: string
  posts: PostModel[]
}
