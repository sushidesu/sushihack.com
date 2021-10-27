interface TagDataProps {
  id: string
  slug: string
  label: string
}

export class TagData {
  constructor(public readonly props: TagDataProps) {}
}
