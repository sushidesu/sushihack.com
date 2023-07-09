const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
})

module.exports = (_, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = withMDX({
    output: "export",
    experimental: {
      appDir: true,
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      })
      return config
    },
    images: {
      disableStaticImages: true,
    },
    pageExtensions: [...defaultConfig.pageExtensions, "mdx"],
  })
  return nextConfig
}
