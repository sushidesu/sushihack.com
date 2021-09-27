import { AppProps } from "next/app"
import "windi.css"
import "../styles/global.css"

const App = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />

export default App
