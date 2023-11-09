/* Libraries */
import { IoIosLogOut } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";

/* Chakra UI */
import { HStack, VStack, Center, Text } from "@chakra-ui/react";

/* Application Modules */
import navigationConfig from "../../config/NavigationConfig";
import Button from "../CustomBtn/Button";
import { useAppDispatch } from "../../store/store";
import { logoutUser } from "../../store/slices/authSlice";

export const Navigation = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const selectedNavItemStyle = (path: string) => {
    if (location.pathname.match(path)) {
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
            BioSeqAnalyzer
          </Text>
        </Center>

        {navigationConfig.map(({ key, path, title, Icon }) => (
          <NavLink key={key} to={path} style={linkStyle}>
            <HStack width="full" {...selectedNavItemStyle(path)}>
              <Icon /> <Text whiteSpace="nowrap">{title}</Text>
            </HStack>
          </NavLink>
        ))}
      </VStack>

      <Button
        leftIcon={<IoIosLogOut />}
        width="full"
        color="white"
        bg="brand_blue.200"
        onClick={() => dispatch(logoutUser())}
        alignSelf="flex-end"
        _hover={{ bg: "brand_blue.200" }}
      >
        Logout
      </Button>
    </VStack>
  );
};

const activeNavStyle = {
  paddingX: 2,
  paddingY: 1.5,
  borderRadius: 3,
  cursor: "pointer",
  bg: "brand_blue.100",
  borderLeft: "5px solid",
  borderRightColor: "blue",
}

const linkStyle = {
  display: "flex",
  width: "100%",
  alignSelf: "start",
  color: "white"
}
