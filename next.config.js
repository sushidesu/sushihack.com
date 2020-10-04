const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
})

module.exports = (_, { defaultConfig }) =>
  withMDX({
    pageExtensions: [...defaultConfig.pageExtensions, "mdx"],
  })
