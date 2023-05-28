import { Flex, Show } from "@chakra-ui/react";
import { Navigation } from "../MenuItem/MenuItem";

const SideNav = () => {
  return (
    <Show breakpoint="(min-width: 1440px)">
      <Navigation />
    </Show>
  );
};

export default SideNav;
