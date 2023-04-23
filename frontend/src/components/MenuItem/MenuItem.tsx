import { HStack, VStack } from "@chakra-ui/react";
import navigationConfig from "../../config/NavigationConfig";
import { Link, useLocation } from "react-router-dom";

export const MenuItem = () => {
  const location = useLocation();

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
    <VStack spacing={5}>
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
  );
};
