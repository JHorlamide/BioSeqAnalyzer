import { Flex, Box, Text, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
  formHeading?: string;
  showHeading?: boolean;
  children: React.ReactNode;
}

const FormContainer = ({ formHeading, showHeading, children }: Props) => {
  return (
    <Flex
      justify="center"
      align="center"
      py="10%"
      bg="brand_blue.300"
      height="100vh">
      <Box
        border={{ sm: "none", md: "1px solid white" }}
        borderRadius={10}
        width="500px"
        py="30px"
        px="20px"
        bg="gray.600"
        height="auto"
      >
        {showHeading && (
          <Stack>
            <Link to="/website">
              <Text fontSize={35} fontWeight="bold" textAlign="center" color="white">
                {formHeading ? formHeading : "ProteinAnalyzer"}
              </Text>
            </Link>
          </Stack>
        )}
        {children}
      </Box>
    </Flex>
  );
};

export default FormContainer;
