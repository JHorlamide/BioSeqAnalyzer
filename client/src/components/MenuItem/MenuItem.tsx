/* Libraries */
import { IoIosLogOut } from "react-icons/io";

/* Chakra UI */ 
import { HStack, VStack, Center, Text } from "@chakra-ui/react";

/* Application Modules */
import navigationConfig from "../../config/NavigationConfig";
import Button from "../CustomBtn/Button";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { logoutUser } from "../../store/slices/authSlice";

export const Navigation = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const selectedNavItemStyle = (path: string) => {
    if (location.pathname === path) {
      return activeNavStyle;
    }

    return null;
  };

  return (
    <VStack
      width="full"
      justifyContent="space-between"
      alignItems="center"
      spacing={{ base: 580, md: "auto" }}
    >
      <VStack spacing={5} width="full">
        <Center>
          <Text
            color="white"
            fontWeight="bold"
            fontSize="24"
            display={{ base: "none", md: "block" }}
          >
            ProteinAnalyzer
          </Text>
        </Center>

        {navigationConfig.map(({ key, path, title, Icon }) => (
          <Link key={key} to={path} style={linkStyle}>
            <HStack {...selectedNavItemStyle(path)} width="full">
              <Icon /> <Text>{title}</Text>
            </HStack>
          </Link>
        ))}
      </VStack>

      <Button
        leftIcon={<IoIosLogOut />}
        width="full"
        color="white"
        bg="brand_blue.200"
        _hover={{ bg: "brand_blue.200" }}
        onClick={() => dispatch(logoutUser())}
        alignSelf="flex-end"
      >
        Logout
      </Button>
    </VStack>
  );
};

const activeNavStyle = {
  bg: "brand_blue.100",
  borderLeft: "5px solid",
  paddingY: 1.5,
  paddingX: 2,
  borderRadius: 3,
  borderRightColor: "blue",
  cursor: "pointer",
}

const linkStyle = {
  display: "flex",
  width: "100%",
  alignSelf: "start",
  color: "white"
}
