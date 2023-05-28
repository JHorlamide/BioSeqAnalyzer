import {
  Box,
  Button as ChakraButton,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
} from "@chakra-ui/react";
import { IconType, icons } from "react-icons";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";

interface ProfileMenuProp {
  fullName: string;
  logout: () => void;
}

interface MenuItem {
  key: string;
  title: string;
  action?: () => void;
  Icon?: IconType
}

const ProfileMenu = ({ fullName, logout }: ProfileMenuProp) => {
  const MenuItems: MenuItem[] = [
    {
      key: "profile.key",
      title: "Profile",
    },

    {
      key: "setting.key",
      title: "Settings",
    },
  ]

  return (
    <Menu>
      <MenuButton as={ChakraButton} bg="brand_blue.300" _hover={{ bg: "brand_blue.300" }}>
        <Box _hover={{ cursor: "pointer" }}>
          <IoIosArrowDown color="white" />
        </Box>
      </MenuButton>

      <MenuList paddingX={3} bg="brand_blue.300" borderColor="white">
        <MenuGroup title={fullName} color="white">
          {MenuItems.map(({ key, title }) => (
            <MenuItem
              key={key}
              width="full"
              color="white"
              bg="brand_blue.300"
              _hover={{ bg: "brand_blue.50" }}
            >
              {title}
            </MenuItem>
          ))}

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