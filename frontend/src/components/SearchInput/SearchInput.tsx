import { ChangeEvent } from "react";
import {
  InputGroup,
  InputLeftElement,
  FormControl,
  Input,
  Box,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setSearchTerm } from "../../store/slices/searchSlice";

const SearchInput = () => {
  const searchTerm = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(setSearchTerm(value));
  };

  return (
    <Box width={{ base: "100%", sm: "100%", md: "50%" }}>
      <form>
        <FormControl width="100%">
          <InputGroup>
            <InputLeftElement
              pointerEvents={"none"}
              children={<FiSearch color="brand_blue.50" />}
            />

            <Input
              _placeholder={{ fontSize: "15px" }}
              _focus={{ border: "2px solid white", outlineColor: "white" }}
              pl="35px"
              // bg="brand_blue.100"
              // border="none"
              border="2px solid white"
              focusBorderColor="none"
              borderRadius={"20px"}
              placeholder="Search projects"
              value={searchTerm}
              onChange={handleSearch}
            />
          </InputGroup>
        </FormControl>
      </form>
    </Box>
  );
};

export default SearchInput;
