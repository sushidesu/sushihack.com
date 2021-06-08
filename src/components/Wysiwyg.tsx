import tw from "twin.macro"
import { styled } from "plugins/emotion"

export type Props = {
  children?: React.ReactNode
}

export function Wysiwyg({ children }: Props): JSX.Element {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  h2 {
    ${tw`mt-12 mb-4`}
    ${tw`font-bold text-2xl`}
  }
  h3 {
    ${tw`mt-12`}
    ${tw`font-bold text-xl`}
  }
  ul {
    ${tw`mt-6`}
    ${tw`space-y-1`}
    ${tw`list-inside list-disc`};
  }
  p {
    ${tw`leading-8`}
    & + p {
      ${tw`mt-6`}
    }
  }
  img {
    ${tw`my-6`}
    ${tw`w-full`}
  }
  a {
    ${tw`text-blue-700`}
  }
  blockquote {
    ${tw`mt-6`}
    ${tw`px-4 py-3`}
    ${tw`border-l-4`}
    ${tw`text-gray-500`}
    & a {
      ${tw`text-blue-600`}
    }
  }
  pre {
    ${tw`my-6`}
    ${tw`py-3 px-6`}
    & code {
      ${tw`bg-transparent`}
    }
  }
  code {
    ${tw`px-2 py-1`}
    ${tw`bg-gray-100`}
  }
`
