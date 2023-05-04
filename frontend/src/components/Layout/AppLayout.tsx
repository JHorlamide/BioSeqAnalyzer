import { Box, Flex } from "@chakra-ui/react";
import HeaderNav from "../HeaderNav/HeaderNav";
import SideNav from "../SideNav/SideNav";
import Footer from "../Footer/Footer";
import Footer2 from "../Footer/Footer";
import { Fragment, Suspense } from "react";
import AppLoader from "../Loading/AppLoader";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      position="relative"
      bg="brand.200"
      borderRadius={{ md: 10, sm: "none" }}
      my={{ md: 5, base: "none" }}
      mx={{ md: 20, base: "none" }}
      height="760px" // 100vh
    >
      <SideNav />

      <Box
        paddingY={{ md: 6, base: 5 }}
        paddingX={{ md: 6, base: 3 }}
        width={{ base: "100vw", md: "100%" }}
        overflow="auto"
      >
        <HeaderNav />
        <Suspense fallback={<AppLoader />}>{children}</Suspense>
        <Footer2 />
      </Box>
    </Flex>
  );
};

export default AppLayout;
