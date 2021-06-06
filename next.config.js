const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
})
const WindiCSSWebpackPlugin = require("windicss-webpack-plugin").default

module.exports = (_, { defaultConfig }) =>
  withMDX({
    webpack: (config) => {
      config.plugins.push(
        new WindiCSSWebpackPlugin({
          scan: {
            dirs: ["./"],
            exclude: ["node_modules", ".git", ".next/**/*"],
          },
        })
      )
      return config
    },
    pageExtensions: [...defaultConfig.pageExtensions, "mdx"],
  })
