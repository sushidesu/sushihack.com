import Link from "next/link"
import clsx from "clsx"

export type Props = {
  title: string
  path: string
  thumbnailPath?: string
  tags: TagProp[]
}

export type TagProp = {
  id: string
  name: string
  path: string
}

export function ArticleCard({
  title,
  path,
  thumbnailPath,
  tags,
}: Props): JSX.Element {
  return (
    <div className={clsx("shadow-md", "rounded-sm", "flex", "px-2", "py-4")}>
      {thumbnailPath ? (
        <img src={thumbnailPath} />
      ) : (
        <div
          className={clsx("bg-blue-200", "w-20", "h-20", "rounded-md")}
        ></div>
      )}
      <div className={clsx("flex", "flex-col", "ml-6", "justify-between")}>
        <p className={clsx("text-2xl", "font-bold")}>
          <Link href={path} passHref>
            <a>{title}</a>
          </Link>
        </p>
        <div className={clsx("space-x-3")}>
          {tags.map((tag) => (
            <Link key={tag.id} href={tag.path} passHref>
              <a>
                <span
                  className={clsx(
                    "border-1",
                    "p-1",
                    "rounded-sm",
                    "border-yellow-400"
                  )}
                >
                  {tag.name}
                </span>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
