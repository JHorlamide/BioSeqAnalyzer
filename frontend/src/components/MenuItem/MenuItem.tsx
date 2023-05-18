import { HStack, VStack, Box, Center, Text, Tooltip } from "@chakra-ui/react";
import { IoIosLogOut } from "react-icons/io";
import navigationConfig from "../../config/NavigationConfig";
import { Link, useLocation } from "react-router-dom";
import Button from "../CustomBtn/Button";
import { useAppDispatch } from "../../store/store";
import { logoutUser } from "../../store/slices/authSlice";

export const Navigation = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const selectedNavItemStyle = (path: string) => {
    if (location.pathname === path) {
      return {
        bg: "brand.200",
        borderLeft: "5px solid",
        paddingY: 1.5,
        paddingX: 2,
        borderRightColor: "brand.50",
        cursor: "pointer",
      };
    }

    return null;
  };

  return (
    <VStack justifyContent="space-between" alignItems="center" width="full">
      <VStack spacing={5} width="full">
        <Center>
          <Text fontWeight="bold" fontSize="24">
            ProteinAnalyzer
          </Text>
        </Center>

        {navigationConfig.map((navItem) => (
          <HStack
            key={navItem.key}
            width="full"
            alignSelf="start"
            {...selectedNavItemStyle(navItem.path)}
          >
            <navItem.icon />
            <Link to={navItem.path}>{navItem.title}</Link>
          </HStack>
        ))}
      </VStack>

      <Button
        leftIcon={<IoIosLogOut />}
        width="full"
        onClick={() => dispatch(logoutUser())}
      >
        Logout
      </Button>
    </VStack>
  );
};
