import { FormEvent, useState } from "react";
import {
  InputGroup,
  InputLeftElement,
  FormControl,
  Input,
  Box,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

const SearchInput = () => {
  const [searchParam, setSearchParam] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    console.log(searchParam);
  };

  return (
    <Box width={{ base: "100%", sm: "100%", md: "50%" }}>
      <form onSubmit={handleSearch}>
        <FormControl width="100%">
          <InputGroup>
            <InputLeftElement
              pointerEvents={"none"}
              children={<FiSearch color="brand.50" />}
            />

            <Input
              _placeholder={{ fontSize: "15px" }}
              _focus={{ borderColor: "gray.400" }}
              pl="35px"
              bg="brand.50"
              border="none"
              focusBorderColor="none"
              borderRadius={"20px"}
              placeholder="Search projects"
              onChange={(e) => setSearchParam(e.target.value)}
            />
          </InputGroup>
        </FormControl>
      </form>
    </Box>
  );
};

export default SearchInput;
