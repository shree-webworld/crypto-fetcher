import { Flex, Spacer, Box, Select, Heading, Avatar, Center, VStack, Text, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import axios from "axios";
import {useEffect, useState} from "react";
import { Card, CardHeader, CardBody, CardFooter, Stack } from '@chakra-ui/react';
import {useRecoilValue} from "recoil";
import {currencyState, currencySymbolState} from "../../store/atom";
import {numberWithCommas} from "../../utils/GeneralFunctions";
import CoinChart from "../../components/CoinChart";
import Head from "next/head";


export default function CoinId()
{
  const router = useRouter();
  const { id } = router.query;
  let [coin, setCoin] = useState();
  const currency = useRecoilValue(currencyState);
  const symbol = useRecoilValue(currencySymbolState);





  let fetchSingleCoin = async () =>{
                      try
                      {
                        let res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
                        console.log("coin ",res);
                        setCoin(res.data);
                      }catch (e)
                       {
                         router.push("/");
                         console.log(e);
                       }
                }

    useEffect( ()=>{
                        fetchSingleCoin();
                        // eslint-disable-next-line react-hooks/exhaustive-deps
                    },[]);

  return (<>
    <Head>
      <title>Chart: Crypto-Fetcher</title>
    </Head>

    <section className="bg-[#15171A] text-gray-800 " style={{fontFamily: "'Inter', sans-serif"}}>
    	<div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
    		<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <Card maxW='md'>
            <CardBody className="shadow-md shadow-white rounded-xl">
            <Avatar name={coin?.name} src={coin?.image.large} size="2xl" />

              <Stack mt='6' spacing='3'>
                <Heading size='lg' color="white">{coin?.name}</Heading>
                <Text color="white" fontSize="lg" className="md:indent-8 sm:indent-0">
                  {(coin?.description.en.split(". ")[0]).replace(/<[^>]+>/g, '')}.
                </Text>
                <HStack>
                  <Heading size="lg" color="white"> Rank : </Heading>
                  <Text fontSize="2xl" fontWeight="normal" color="white" pt="0.3rem">{coin?.market_cap_rank}</Text>
                </HStack>
                <HStack>
                  <Heading size="lg" color="white"> Current Price : </Heading>
                  <Text fontSize="2xl" fontWeight="normal" color="white" pt="0.5rem">
                    {symbol}{" "}{(coin?.market_data.current_price[currency.toLowerCase()])}
                  </Text>
                </HStack>
                <HStack>
                  <Heading size="lg" color="white"> Market Cap : </Heading>
                  <Text fontSize="2xl" fontWeight="normal" color="white" pt="0.5rem">
                    {" "}{symbol}{" "}{(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))}{" "}M
                  </Text>
                </HStack>
              </Stack>
            </CardBody>
          </Card>
    		</div>
    		<div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-full lg:h-96 xl:h-112 2xl:h-128 ">
          <CoinChart  coin={coin}/>
    		</div>
    	</div>
    </section>
          </>);
}
