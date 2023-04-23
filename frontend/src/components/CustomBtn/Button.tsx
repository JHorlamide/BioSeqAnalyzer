import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

interface Props extends ButtonProps {
  light?: boolean;
  isDisabled?: boolean;
}

const Button = (props: Props) => {
  const { light, isDisabled, children, ...rest } = props;

  return (
    <ChakraButton
      fontWeight="500"
      fontSize={["0.875rem", "1rem"]}
      isDisabled={isDisabled}
      borderRadius="full"
      {...rest}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
