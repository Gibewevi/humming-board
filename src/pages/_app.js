import '@/styles/globals.css'
import AuthProvider from '@/context/AuthProvider'
export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
