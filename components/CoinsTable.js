import { Box, Heading, Center, VStack, Text, Input, Skeleton, Avatar, HStack } from '@chakra-ui/react';
import Image from 'next/image';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import {useState, useEffect} from "react";
import {useRecoilValue} from "recoil";
import {currencyState, currencySymbolState} from "../store/atom";
import axios from "axios";
import Link from 'next/link';
import { useRouter } from 'next/router';
import {numberWithCommas} from "../utils/GeneralFunctions";
import Pagination from "./Pagination";



export default function CoinsTable()
{
    const router = useRouter();
    const currency = useRecoilValue(currencyState);
    const symbol = useRecoilValue(currencySymbolState);

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const fetchCoinsTable = async () =>{
                                  try
                                  {
                                    setLoading(true);
                                    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
                                    // console.log("fetchCoinsTable - ",res.data);

                                    setCoins(res.data);
                                    setLoading(false);

                                  }catch (e)
                                   {
                                      console.log(e);
                                   }
                        };

    // console.log("coins - ",coins);

    const handleSearch = () => {
        return coins.filter(
              (coin) => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
            );
      };


    useEffect(() => {
                      fetchCoinsTable();
                      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [currency]);

      const lastPageIndex = currentPage * rowsPerPage;
      const firstPageIndex = lastPageIndex - rowsPerPage;
      // const currentTable = coins.slice(firstPageIndex, lastPageIndex);

  return(<>
          <Box bg="#15171A" w="100%" h="73rem" style={{fontFamily: "'Inter', sans-serif"}}>
              <Center>
                <VStack spacing="1.5rem">
                <Text color="white" mt="1rem" fontSize="3xl">
                  Cryptocurrency Prices by Market Cap
                </Text>
                <Input placeholder='Search for Crypto Currency..' size="md" variant="outline"
                      color="white" fontSize="md" borderColor="#EFBD1D"
                      onChange={(e)=> setSearch(e.target.value)}
                />
               </VStack>
              </Center>

              <Center>
              <TableContainer mt="2rem" w={{sm:"43rem", md:"80%"}} borderRadius="md">
              { loading ?
                (<Skeleton startColor='yellow.700' endColor='yellow.300' height='20px' />) :
                (
                <Table variant='simple'>
                  <TableCaption>
                    <Pagination totalRows={coins.length}
                                rowsPerPage={rowsPerPage}
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                    />
                  </TableCaption>
                  <Thead bg="#EFBD1D">
                    <Tr>
                      <Th fontSize="1rem" color="gray.900">Coin</Th>
                      <Th fontSize="1rem" color="gray.900">Price</Th>
                      <Th fontSize="1rem" color="gray.900">24 hr Change</Th>
                      <Th fontSize="1rem" color="gray.900">Market Cap</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {
                      handleSearch()
                      .slice(firstPageIndex, lastPageIndex)
                      .map( (row)=>{
                                                  const profit = row.price_change_percentage_24h > 0;
                                                  return(
                                                         <Tr key={row.name} onClick={() => router.push(`/coin/${row.id}`)} cursor="pointer" _hover={{ bg: "gray.700" }}>
                                                          <Td>
                                                           <HStack spacing="1rem">
                                                            <Avatar name={`${row.name}`} src={`${row.image}`} />
                                                            <VStack>
                                                              <Text fontSize="xl" textTransform="uppercase" fontWeight="semibold" color="white">
                                                                {`${row.symbol}`}
                                                              </Text>
                                                              <Text fontSize="sm" color="white">
                                                                {`${row.name}`}
                                                              </Text>
                                                            </VStack>
                                                          </HStack>
                                                          </Td>

                                                          <Td fontSize="md" fontWeight="semibold" color="white">
                                                            {symbol}{" "}{numberWithCommas(row.current_price.toFixed(2))}
                                                          </Td>

                                                          <Td fontWeight="semibold" style={ {color: profit > 0 ? "rgb(14, 203, 129)" : "red"} }>
                                                            {profit && "+"}
                                                            {row.price_change_percentage_24h.toFixed(2)}%
                                                          </Td>

                                                          <Td fontSize="semibold" fontWeight="semibold" color="white">
                                                            {symbol}{" "}{numberWithCommas(row.market_cap.toString().slice(0, -6))} M
                                                          </Td>
                                                         </Tr>
                                                        )
                                                }
                                        )
                    }
                  </Tbody>
                </Table>
                )
              }
              </TableContainer>
              </Center>
          </Box>
        </>);
}
