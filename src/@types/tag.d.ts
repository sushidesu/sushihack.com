interface Tag extends GraphCMSSystemModel {
  label: string
  slug: string
  posts: Post[]
}
