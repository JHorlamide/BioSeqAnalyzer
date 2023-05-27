import {
  Box,
  Button as ChakraButton,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
} from "@chakra-ui/react";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";

interface ProfileMenuProp {
  fullName: string;
  logout: () => void;
}

const ProfileMenu = ({ fullName, logout }: ProfileMenuProp) => {
  return (
    <Menu>
      <MenuButton as={ChakraButton}>
        <Box _hover={{ cursor: "pointer" }}>
          <IoIosArrowDown color="brand_blue.50" />
        </Box>
      </MenuButton>

      <MenuList paddingX={3} bg="brand_blue.50">
        <MenuGroup title={fullName}>
          <MenuItem borderRadius={16} bg="brand_blue.50" _hover={{ bg: "brand_blue.200" }}>Profile</MenuItem>
          <MenuItem borderRadius={16} bg="brand_blue.50" _hover={{ bg: "brand_blue.200" }}>Setting</MenuItem>
          <MenuItem
            bg="brand_blue.50"
            as="div"
            icon={<IoIosLogOut size={18} />}
            borderRadius={16}
            onClick={logout}
            _hover={{
              bg: "brand_blue.200",
              cursor: "pointer"
            }}
          >
            Logout
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;