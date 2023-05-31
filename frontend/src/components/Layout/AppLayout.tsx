import { Box, Flex, Show } from "@chakra-ui/react";
import HeaderNav from "../HeaderNavigation/HeaderNavigation";
import SideNav from "../SideNavigation/SideNavigation";
import Footer from "../Footer/Footer";
import { Suspense } from "react";
import AppLoader from "../Loading/AppLoader";
import { Navigation } from "../MenuItem/MenuItem";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      position="relative"
      bg="brand_blue.50"
      borderRadius={{ md: 10, sm: "none" }}
      my={{ base: "none", md: 5 }}
      mx={{ base: "none", md: 20 }}
      height={{ base: "100vh", md: "95vh" }} // 100vh
      width={{ base: "full", md: "92vw" }}
    >
      <Flex
        display={{ base: "none", md: "flex" }}
        position="relative"
        alignSelf="center"
        height="90%"
        width="20%"
        bg="brand_blue.300"
        borderRadius={12}
        overflow="auto"
        right={16}
        paddingY={3}
        paddingX={3}
      >
        <Navigation />
      </Flex>

      <Box
        paddingY={{ md: 6, base: 5 }}
        paddingX={{ md: 6, base: 3 }}
        width={{ base: "100vw", md: "100%" }}
        overflow="auto"
      >
        <HeaderNav />
        <Suspense fallback={<AppLoader />}>
          {children}
        </Suspense>
        <Footer />
      </Box>
    </Flex>
  );
};

export default AppLayout;
