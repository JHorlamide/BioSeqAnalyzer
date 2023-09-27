/* Chakra UI */
import { Box, Flex } from "@chakra-ui/react";

/* Application Components */
import HeaderNav from "../HeaderNavigation/HeaderNavigation";
import SideNav from "../SideNavigation/SideNavigation";
import Footer from "../Footer/Footer";
import { Suspense } from "react";
import AppLoader from "../Loading/AppLoader";
import { Navigation } from "../MenuItem/MenuItem";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      bg="brand_blue.50"
      borderRadius={{ md: 10, sm: "none" }}
      height={{ base: "100vh", md: "100vh" }}
      width={{ base: "full", md: "full" }}
    >
      <Flex
        display={{ base: "none", md: "flex" }}
        alignSelf="center"
        height="full"
        width="20%"
        bg="brand_blue.300"
        overflow="auto"
        right={5}
        paddingY={3}
        paddingX={3}
      >
        <Navigation />
      </Flex>

      <Box
        paddingY={{ md: 4, base: 5 }}
        paddingX={{ md: 4, base: 3 }}
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
