/* Libraries */
import { AiOutlineUserDelete } from "react-icons/ai";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";

/* Chakra */
import {
  Box,
  Button as ChakraButton,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  Divider,
} from "@chakra-ui/react";

interface ProfileMenuProp {
  fullName: string;
  logout: () => void;
  deleteAccount: () => void;
}

const ProfileMenu = ({ fullName, logout, deleteAccount }: ProfileMenuProp) => {
  return (
    <Menu>
      <MenuButton as={ChakraButton} bg="brand_blue.300" _hover={{ bg: "brand_blue.300" }}>
        <Box _hover={{ cursor: "pointer" }}>
          <IoIosArrowDown color="white" />
        </Box>
      </MenuButton>

      <MenuList bg="brand_blue.300" borderColor="white">
        <MenuGroup title={fullName} color="white">
          <Divider color="white" />

          <Box paddingX={3}>
            <MenuItem
              as="div"
              color="white"
              alignContent="center"
              fontWeight="semibold"
              bg="red.400"
              marginTop={2}
              icon={<AiOutlineUserDelete size={18} />}
              borderRadius={16}
              onClick={deleteAccount}
              _hover={{ bg: "red.300", cursor: "pointer" }}
            >
              Delete Account
            </MenuItem>

            <MenuItem
              as="div"
              color="white"
              alignContent="center"
              fontWeight="semibold"
              bg="brand_blue.50"
              marginTop={2}
              icon={<IoIosLogOut size={18} />}
              borderRadius={16}
              onClick={logout}
              _hover={{ bg: "brand_blue.200", cursor: "pointer" }}
            >
              Logout
            </MenuItem>
          </Box>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;