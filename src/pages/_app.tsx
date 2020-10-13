import { AppProps } from "next/app"
import { CssBaseline } from "@geist-ui/react"
import { ThemeProvider } from "emotion-theming"
import { Global, css } from "@emotion/core"
import { Theme } from "plugins/emotion"

const theme: Theme = {
  color: {
    primary: "#ccc",
    secondary: "#dedede",
    accent: "#fea",
  },
}

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Global
      styles={css`
        body {
          font-family: "Inter", "BlinkMacSystemFont",
            "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
        }
      `}
    />
    <Component {...pageProps} />
  </ThemeProvider>
)

export default App
