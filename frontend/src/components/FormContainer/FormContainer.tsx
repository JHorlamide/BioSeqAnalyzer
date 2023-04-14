import { Flex, Box, Text, Stack } from "@chakra-ui/react";

interface Props {
  formHeading?: string;
  showHeading?: boolean;
  children: React.ReactNode;
}

const FormContainer = ({ formHeading, showHeading, children }: Props) => {
  return (
    <Flex justify="center" align="center" py="10%">
      <Box
        border={{ sm: "none", md: "1px" }}
        borderRadius={5}
        width="500px"
        py="30px"
        px="20px"
        bg="gray.600"
        height="auto"
      >
        {showHeading && (
          <Stack>
            <Text fontSize={35} fontWeight="bold" textAlign="center">
              {formHeading ? formHeading : "ProteinAnalyzer"}
            </Text>
          </Stack>
        )}

        {children}
      </Box>
    </Flex>
  );
};

export default FormContainer;
