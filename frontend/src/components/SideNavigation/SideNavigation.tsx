import { Flex, Show } from "@chakra-ui/react";
import { Navigation } from "../MenuItem/MenuItem";

const SideNav = () => {
  return (
    <Show breakpoint="(min-width: 1440px)">
      <Flex
        alignSelf="center"
        height="90%"
        width="20%"
        bg="brand_blue.300"
        borderRadius={12}
        overflow="auto"
        position="relative"
        right={16}
        paddingY={3}
        paddingX={3}
      >
        <Navigation />
      </Flex>
    </Show>
  );
};

export default SideNav;
