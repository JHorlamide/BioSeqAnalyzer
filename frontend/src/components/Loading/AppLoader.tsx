import { Spinner, Center } from "@chakra-ui/react";

const AppLoader = () => {
  return (
    <Center justifyContent="center" alignItems="center">
      <Spinner
        mt={100}
        thickness="4px"
        speed="0.65s"
        emptyColor="white"
        color="blue"
        size="xl"
      />
    </Center>
  );
};

export default AppLoader;
