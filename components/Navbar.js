import { Flex, Spacer, Box, Select, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {useRecoilValue, useRecoilState} from "recoil";
import {currencyState, currencySymbolState} from "../store/atom";
import {useEffect} from "react";

export default function Navbar()
{
  const router = useRouter();
  const [currency, setCurrency] = useRecoilState(currencyState);
  const [symbol, setSymbol] = useRecoilState(currencySymbolState);


  useEffect(() => {
                    if (currency === "INR")
                        setSymbol("₹");
                    else if (currency === "USD")
                        setSymbol("$");

                    // eslint-disable-next-line react-hooks/exhaustive-deps
                  }, [currency]);


  return (
    <Flex alignItems='center' bgColor="#15171A" style={{fontFamily: "'Inter', sans-serif"}}>
      <Box p='2' ml="5rem">
        <Heading size='md' color="#EFBD1D" cursor="pointer" onClick={()=>router.push("/")}>
          Crypto-Fetcher
        </Heading>
      </Box>
      <Spacer />
      <Select mr="5rem" my="0.8rem" size="md" variant='outline' color="yellow.500" w="8.5rem" bg="white" fontSize="lg" fontWeight='semibold'
              value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value='INR'> INR (₹) </option>
        <option value='USD'> USD ($) </option>
      </Select>
    </Flex>
          );
}
