import '@/styles/globals.css'
import UsepageHeight from '@/scripts/UsepageHeight'
import Layout from '@/components/Layout'

export default function App({ Component, pageProps }) {
  UsepageHeight()
  return (
    <Layout >
      <Component {...pageProps} />
    </Layout>
  )
}
