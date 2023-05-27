import { HStack, VStack, Center, Text } from "@chakra-ui/react";
import { IoIosLogOut } from "react-icons/io";
import navigationConfig from "../../config/NavigationConfig";
import { Link, useLocation } from "react-router-dom";
import Button from "../CustomBtn/Button";
import { useAppDispatch } from "../../store/store";
import { logoutUser } from "../../store/slices/authSlice";

export const Navigation = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  
  const activeNavStyle = {
    bg: "brand_blue.100",
    borderLeft: "5px solid",
    paddingY: 1.5,
    paddingX: 2,
    borderRightColor: "blue",
    cursor: "pointer",
  }

  const selectedNavItemStyle = (path: string) => {
    if (location.pathname === path) {
      return activeNavStyle;
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

        {navigationConfig.map(({ key, path, title, Icon }) => (
          <Link key={key} to={path} style={{ display: "flex", width: "100%", alignSelf: "start" }}>
            <HStack {...selectedNavItemStyle(path)} width="full">
              <Icon /> <Text>{title}</Text>
            </HStack>
          </Link>

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
