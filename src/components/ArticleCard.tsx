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
    <div className={clsx("shadow-sm", "rounded-sm", "flex", "px-2", "py-4")}>
      {thumbnailPath ? (
        <img src={thumbnailPath} />
      ) : (
        <div
          className={clsx("bg-blue-gray-300", "w-20", "h-20", "rounded-md")}
        ></div>
      )}
      <div className={clsx("flex", "flex-col", "ml-6", "justify-between")}>
        <p className={clsx("text-xl", "font-bold")}>
          <Link href={path} passHref>
            <a className={clsx("hover:text-blue-800")}>{title}</a>
          </Link>
        </p>
        <div className={clsx("space-x-3")}>
          {tags.map((tag) => (
            <Link key={tag.id} href={tag.path} passHref>
              <a>
                <span
                  className={clsx(
                    "px-3",
                    "py-2",
                    "rounded-sm",
                    "text-blue-gray-600"
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
