import { ChangeEvent } from "react";

/* Chakra UI */
import {
  InputGroup,
  InputLeftElement,
  FormControl,
  Input,
  Box,
} from "@chakra-ui/react";

/* Libraries */
import { FiSearch } from "react-icons/fi";

/* Application Modules */ 
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
              children={<FiSearch color="white" />}
            />

            <Input
              _placeholder={{ fontSize: "15px", color: "white" }}
              pl="35px"
              color="white"
              border="1px solid white"
              focusBorderColor="white"
              borderRadius="full"
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
