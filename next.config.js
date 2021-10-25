const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
})

module.exports = (_, { defaultConfig }) =>
  withMDX({
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.node = { fs: "empty", module: "empty" }
      }
      return config
    },
    pageExtensions: [...defaultConfig.pageExtensions, "mdx"],
  })
