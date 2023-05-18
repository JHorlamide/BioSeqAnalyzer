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
          <IoIosArrowDown color="brand.50" />
        </Box>
      </MenuButton>

      <MenuList paddingX={3}>
        <MenuGroup title={fullName}>
          <MenuItem borderRadius={16}>Profile</MenuItem>
          <MenuItem borderRadius={16}>Setting</MenuItem>
          <MenuItem
            as="div"
            icon={<IoIosLogOut size={18} />}
            borderRadius={16}
            onClick={logout}
            _hover={{
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