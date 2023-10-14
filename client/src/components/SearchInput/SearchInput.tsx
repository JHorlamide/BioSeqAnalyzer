/* React */
import { useEffect } from "react";

/* Chakra UI */
import {
  InputGroup,
  InputLeftElement,
  FormControl,
  Input,
  Box,
  BoxProps
} from "@chakra-ui/react";

/* Libraries */
import { FiSearch } from "react-icons/fi";
import { DebouncedFunc } from "lodash";

interface SearchInputProps {
  styleProps: BoxProps;
  handleSearchQuery: DebouncedFunc<({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => void>
}

const SearchInput = (props: SearchInputProps) => {
  const { styleProps, handleSearchQuery } = props;

  useEffect(() => {
    return () => {
      handleSearchQuery.cancel();
    };
  }, [handleSearchQuery]);


  return (
    <Box width={{ base: "100%", sm: "100%", md: "50%" }} {...styleProps}>
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
            onChange={handleSearchQuery}
          />
        </InputGroup>
      </FormControl>
    </Box>
  );
};

export default SearchInput;
