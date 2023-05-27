import { useEffect, useState } from 'react';
import { Box } from "@chakra-ui/react";
import Button from '../CustomBtn/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const [pages, setPages] = useState<number[]>([]);

  const generatePages = () => {
    const pageArray = [];
    
    for (let i = 1; i <= totalPages; i++) {
      pageArray.push(i);
    }

    setPages(pageArray);
  }

  useEffect(() => {
    generatePages();
  }, [totalPages]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <Box position="relative" bottom={{ base: -10, md: -5 }}>
      <Box
        display={{ base: "column", md: "flex" }}
        justifyContent="center"
        alignContent={{ base: "center", md: "start" }}
        alignItems="center" mt={4}
      >
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
          mr={2}
          marginBottom={{ base: 5, md: 0 }}
        >
          Previous
        </Button>

        <Box>
          {pages.map((page) => (
            <Button
              key={page}
              bg={page === currentPage ? "brand_blue.300" : "blue.100"}
              onClick={() => handlePageChange(page)}
              variant={page === currentPage ? "solid" : "outline"}
              mr={{ base: 1, md: 2 }}
            >
              {page}
            </Button>
          ))}
        </Box>

        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          ml={{ base: 0, md: 2 }}
          marginTop={{ base: 5, md: 0 }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default Pagination