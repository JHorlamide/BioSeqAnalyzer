import { Text, Flex, Stack, Center, Show } from "@chakra-ui/react";
import { MenuItem } from "../MenuItem/MenuItem";

const SideNav = () => {
  return (
    <Show breakpoint="(min-width: 1440px)">
      <Flex
        alignSelf="center"
        height="90%"
        width="20%"
        bg="brand.100"
        borderRadius={12}
        overflow="auto"
        position="relative"
        right={16}
        paddingY={3}
        paddingX={3}
      >
        <Stack spacing={5}>
          <Center>
            <Text fontWeight="bold" fontSize="24">
              ProteinAnalyzer
            </Text>
          </Center>

          {/* Menu Items */}
          <MenuItem />
        </Stack>
      </Flex>
    </Show>
  );
};

export default SideNav;
