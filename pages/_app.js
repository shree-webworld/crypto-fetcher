import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layout';
import {RecoilRoot} from "recoil";

function MyApp({ Component, pageProps })
{
  return (
          <RecoilRoot>
            <ChakraProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ChakraProvider>
          </RecoilRoot>
        )
}

export default MyApp
