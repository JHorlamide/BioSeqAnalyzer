import { Fragment } from "react";
import {
  Flex,
  HStack,
  Text,
  Show,
  useDisclosure,
} from "@chakra-ui/react";
import SearchInput from "../SearchInput/SearchInput";
import { CiUser } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { logoutUser } from "../../store/slices/authSlice";
import MobileNav from "../MobileNav/MobileNav";
import { CgMenuGridO } from "react-icons/cg";
import ProfileMenu from "./components/ProfileMenu";

interface MenuIconProps {
  onOpen: () => void;
}

const MenuIcon = ({ onOpen }: MenuIconProps) => {
  return (
    <Show breakpoint="(max-width: 1350px)">
      <CgMenuGridO onClick={onOpen} size={40} style={{ cursor: "pointer" }} />
    </Show>
  );
};

const HeaderNav = () => {
  const dispatch = useAppDispatch();
  const { email, fullName } = useAppSelector((state) => state.auth.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

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

          <ProfileMenu fullName={fullName} logout={handleLogout} />
        </HStack>
      </Flex>
    </Fragment>
  );
};

export default HeaderNav;
