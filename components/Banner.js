import { Box, Heading, Center, VStack, Text } from '@chakra-ui/react';
import Carousel from "./Carousel";

export default function Banner()
{

  return(<>
          <Box w="100%" h="27em" bgImage="url('/banner2.jpg')"
              bgPosition="center" bgRepeat="no-repeat" style={{fontFamily: "'Inter', sans-serif"}}>
              <Center>
                <VStack spacing="2rem">
                <Heading color="white" mt="1rem" size="4xl">
                  Crypto-Fetcher
                </Heading>
                <Text color="white" mt="1rem" fontSize="lg">
                  Get Info Regarding Your Favorite Crypto Currency
                </Text>
                <Box w={{sm:"40rem", md:"80rem"}} mt="1rem">
                  <Carousel />
                </Box>
               </VStack>
              </Center>
          </Box>
        </>);
}
