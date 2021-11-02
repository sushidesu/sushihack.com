const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
})

module.exports = (_, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = withMDX({
    pageExtensions: [...defaultConfig.pageExtensions, "mdx"],
  })
  return nextConfig
}
