import {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {currencyState} from "../store/atom";
import axios from "axios";
import {Text, CircularProgress, CircularProgressLabel, Box, Button, Center} from '@chakra-ui/react';
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {chartDays} from "../utils/GeneralFunctions";

export default function CoinChart({coin})
{
  let [historicalData, setHistoricalData] = useState();
  let [days, setDays] = useState(1);
  let [flag,setFlag] = useState(false);
  let currency = useRecoilValue(currencyState);


  // console.log("coin chart  - ",coin);
  let fetchChartData = async () =>{
                      try
                      {
                         let res = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=${days}`);
                         console.log("CoinChart ->> ",res.data);
                         setFlag(true);
                         setHistoricalData(res.data.prices);
                      }catch (e)
                       {
                         console.log(e);
                       }
                }

                // console.log("historicalData - ",historicalData);

  useEffect( ()=>{
                    fetchChartData();
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                 },[currency, days, coin]);

  return(<>
          {
            !historicalData | flag===false ?
            (
             <Box w={{sm:"42rem",md:"60rem"}} h={{sm:"25rem",md:"30rem"}} mt={{sm:"1rem",md:"6rem"}}>
             <Center>
              <CircularProgress isIndeterminate color='#EFBD1D' thickness="0.5rem" size="12rem">
                <CircularProgressLabel fontSize="md" color="white">
                  Loading Chart..
                </CircularProgressLabel>
              </CircularProgress>
            </Center>
           </Box>
            )
            :
            (
              <Box w={{sm:"42rem",md:"60rem"}} h={{sm:"25rem",md:"30rem"}} mt={{sm:"1rem",md:"6rem"}}>
              <Line data={{
                            labels: historicalData.map((coin) =>{
                                                                let date = new Date(coin[0]);
                                                                let time = date.getHours() > 12
                                                                           ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                                                           : `${date.getHours()}:${date.getMinutes()} AM`;
                                                                return days === 1 ? time : date.toLocaleDateString();
                                                              }
                                                    ),
                                                    datasets: [
                                                                      {
                                                                        data: historicalData.map((coin) => coin[1]),
                                                                        label: `Price ( Past ${days} Days ) in ${currency}`,
                                                                        borderColor: "#EEBC1D"
                                                                      },
                                                              ],
                         }}
                         options={{
                                     elements: {
                                                  point: {
                                                            radius: 1,
                                                          },
                                              },
                                     maintainAspectRatio: false
                                  }}
                />

              {
              chartDays.map((day) =>(
                                      <Button variant='outline' mt="1rem" mx={{sm:"1rem",md:"2.8rem"}} px={{sm:"1rem",md:"2.5rem"}}
                                              color="white" borderColor="#EFBD1D" _hover={{ background: "#EFBD1D", color:"gray.900" }}
                                              fontWeight="lighter"  key={day.value}
                                              className={(day.value) === days ? "bg-[#EFBD1D]" : ""}
                                               onClick={() =>{
                                                                setDays(day.value);
                                                                setFlag(false);
                                                              }
                                                        }
                                      >
                                        {day.label}
                                      </Button>
                                    )
                          )
               }
              </Box>

              )
          }
        </>);
}
