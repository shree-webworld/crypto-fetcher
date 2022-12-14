import Layout from "../components/Layout";
import Banner from "../components/Banner";
import CoinsTable from "../components/CoinsTable";
import Head from 'next/head';

export default function Home()
{
  return (<>
              <Head>
                <title>Crypto-Fetcher</title>
              </Head>
                <Banner/>
                <CoinsTable />
          </>);
}
