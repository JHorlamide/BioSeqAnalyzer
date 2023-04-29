import {
  Box,
  Flex,
  HStack,
  Text,
  Show,
  Button as ChakraButton,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
} from "@chakra-ui/react";
import SearchInput from "../SearchInput/SearchInput";
import { CiUser } from "react-icons/ci";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../store";
import Button from "../CustomBtn/Button";
import { logoutUser } from "../../store/slices/authSlice";
import MobileNav from "../MobileNav/MobileNav";
import { CgMenuGridO } from "react-icons/cg";
import React, { Fragment } from "react";

interface MenuList {
  title: string;
  icon: React.ReactElement;
  action: () => void;
}

interface MenuIconProps {
  onOpen: () => void;
}

interface ProfileMenuProp {
  fullName: string;
  menuList: MenuList[];
}

const MenuIcon = ({ onOpen }: MenuIconProps) => {
  return (
    <Show breakpoint="(max-width: 1350px)">
      <CgMenuGridO onClick={onOpen} size={40} style={{ cursor: "pointer" }} />
    </Show>
  );
};

const ProfileMenu = ({ fullName, menuList }: ProfileMenuProp) => {
  return (
    <Menu>
      <MenuButton as={ChakraButton}>
        <Box _hover={{ cursor: "pointer" }}>
          <IoIosArrowDown color="brand.50" />
        </Box>
      </MenuButton>

      <MenuList paddingX={3}>
        <MenuGroup title={fullName}>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Setting</MenuItem>
          <MenuItem>
            {menuList.map((menuItem, idx) => (
              <Button
                key={idx}
                width="90%"
                leftIcon={menuItem.icon}
                onClick={menuItem.action}
              >
                {menuItem.title}
              </Button>
            ))}
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

const HeaderNav = () => {
  const dispatch = useAppDispatch();
  const { email, fullName } = useAppSelector((state) => state.auth.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const profileMenuList: MenuList[] = [
    { title: "Logout", icon: <IoIosLogOut />, action: handleLogout },
  ];

  return (
    <Fragment>
      <MobileNav isOpen={isOpen} onClose={onClose} />

      <Flex
        justifyContent="space-between"
        alignItems="center"
        width="full"
        mb={6}
      >
        {/* Menu Icon */}
        <MenuIcon onOpen={onOpen} />

        {/* Search Input */}
        <SearchInput />

        <HStack spacing={3} alignItems="center" marginLeft={{ base: 1, sm: 1 }}>
          <Show breakpoint="(min-width: 844px)">
            <HStack spacing={1} alignItems="center">
              <CiUser color="brand.50" />
              <Text>{email}</Text>
            </HStack>
          </Show>

          <ProfileMenu fullName={fullName} menuList={profileMenuList} />
        </HStack>
      </Flex>
    </Fragment>
  );
};

export default HeaderNav;
