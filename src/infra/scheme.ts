interface GraphCMSModel {
  id: string
}

export interface PostModel extends GraphCMSModel {
  slug: string
  title: string
  body: string
  tags: TagModel[]
}

export interface TagModel extends GraphCMSModel {
  slug: string
  label: string
  posts: PostModel[]
}
