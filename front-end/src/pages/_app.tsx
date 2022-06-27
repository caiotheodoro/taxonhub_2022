import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import themeFile from '../theme/theme'
import { Navbar } from '../components/Navbar'
import { DatasetProvider } from '../hooks/useDataset'
const theme = extendTheme(themeFile)



function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider theme={theme}>
      <DatasetProvider>
      <Navbar>
        <Component {...pageProps} />
      </Navbar>
      </DatasetProvider>
    </ChakraProvider>
  )
}


export default MyApp


