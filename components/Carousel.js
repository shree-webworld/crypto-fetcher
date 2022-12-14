import {useEffect, useState} from "react";
import axios from "axios";
import {useRecoilValue, useRecoilState} from "recoil";
import {currencyState, currencySymbolState} from "../store/atom";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Image, VStack, Text } from '@chakra-ui/react';
import {numberWithCommas} from "../utils/GeneralFunctions";
import Link from 'next/link';




export default function Carousel()
{
    const currency = useRecoilValue(currencyState);
    const symbol = useRecoilValue(currencySymbolState);
    const [trending, setTrending] = useState([]);
    // const [symbol, setSymbol] = useRecoilState(currencySymbolState);



    useEffect( ()=>{
                      let fetchTrendingCoins = async () =>{
                            try
                            {
                                console.log(`currency - ${currency}`);
                                let res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`);
                                // console.log(res.data);
                                setTrending(res.data);
                                console.log(`currency after- ${currency}`);
                            }catch (e)
                              {
                                console.log(e);
                              }
                        }

                    fetchTrendingCoins();
                   },[currency]);




   const items = trending?.map( (coin, index) =>{
                                          let profit = coin?.price_change_percentage_24h >= 0;

                                          return(
                                                  <Link href={`/coin/${encodeURIComponent(coin.id)}`} key={coin?.id}>
                                                  <VStack >
                                                    <Image src={coin?.image} alt={coin?.name} boxSize='7rem' objectFit='cover' />
                                                    <Text fontSize="sm" as="b" color="white" textTransform ="capitalize">
                                                      {coin?.symbol} &nbsp; <span style={{color: profit > 0 ? "rgb(14, 203, 129)" : "red", fontWeight: 500,}}>
                                                                              {profit && "+"}
                                                                              {coin?.price_change_percentage_24h?.toFixed(2)}%
                                                                            </span>
                                                    </Text>
                                                    <Text fontSize="xl" fontWeight="semibold" color="white">
                                                      {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                                                    </Text>
                                                  </VStack>
                                                  </Link>
                                                )
                                        }
                              )


    const responsive = {
                           0: {
                                  items: 2,
                              },
                           568: {
                                  items: 2,
                                },
                          1024: {
                                   items: 4,
                                },
                      };

      return(<>

        <AliceCarousel
                mouseTracking
                autoPlay
                autoPlayControls={false}
                autoPlayInterval={1000}
                animationDuration={1500}
                infinite
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                items={items}
              />

            </>);
}
