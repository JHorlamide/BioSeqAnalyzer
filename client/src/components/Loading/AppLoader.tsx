import { Spinner, Center, SpinnerProps } from "@chakra-ui/react";

interface Props {
  spinnerProps?: SpinnerProps
}

const AppLoader = ({ spinnerProps, ...rest }: Props) => {
  return (
    <Center justifyContent="center" alignItems="center" {...spinnerProps} {...rest}>
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
