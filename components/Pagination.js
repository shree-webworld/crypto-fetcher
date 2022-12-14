import { Button } from '@chakra-ui/react';


export default function Pagination({totalRows, rowsPerPage, setCurrentPage, currentPage})
{
  let pages = [];

  for(let i = 1; i<= Math.ceil(totalRows / rowsPerPage); i++ )
  {
    pages.push(i);
  }


  return(<>
          {
            pages.map( (page, index) =>{
                                            return <Button  key={index} variant='outline' fontWeight="bold"
                                                            color="white" borderColor="#EFBD1D" mx="0.5rem"
                                                            _hover={{ background: "#EFBD1D", color:"gray.900" }}
                                                            className={page === currentPage ? "bg-[#EFBD1D]" : ""}
                                                            onClick={()=>setCurrentPage(page)}
                                                    >
                                                      {page}
                                                    </Button>
                                       }
                     )
          }
        </>);
}
