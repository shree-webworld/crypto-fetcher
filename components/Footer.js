import { Box, Text, Center } from '@chakra-ui/react';


export default function Footer()
{
  return(
            <Box w="100%" py="0.5rem" bg="#15171A" style={{fontFamily: "'Inter', sans-serif"}}>
             <Center>
              <Text color="#EFBD1D" fontSize="lg">
                Made with <i className="bi bi-heart-fill text-red-600"></i> by Shreedhar
              </Text>
              </Center>
            </Box>
        );
}
