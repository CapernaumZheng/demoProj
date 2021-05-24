import '../styles/globals.css'

interface Props {
  Component: React.ElementType;
  pageProps: Object
}

const MyApp: React.FC<Props> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

export default MyApp
