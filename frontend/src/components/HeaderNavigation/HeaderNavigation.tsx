import { Fragment, useEffect, useState } from "react";
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
import { useLocation } from "react-router-dom";
import { APP_PREFIX_PATH } from "../../config/AppConfig";

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
  const location = useLocation();
  const [isDashboardPage, setIsDashboardPage] = useState(false);
  const { email, fullName } = useAppSelector((state) => state.auth.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setIsDashboardPage(location.pathname === `${APP_PREFIX_PATH}/dashboard`);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Fragment>
      <MobileNav isOpen={isOpen} onClose={onClose} />

      <Flex
        justifyContent={isDashboardPage ? "space-between" : "flex-end"}
        alignItems="center"
        width="full"
        mb={6}
      >
        {/* Menu Icon */}
        <MenuIcon onOpen={onOpen} />

        {/* Search Input */}
        {isDashboardPage && <SearchInput />}

        <HStack spacing={3} alignItems="center" marginLeft={{ base: 1, sm: 1 }}>
          <Show breakpoint="(min-width: 844px)">
            <HStack spacing={1} alignItems="center">
              <CiUser color="white" fontWeight="bold" />
              <Text color="white">{email}</Text>
            </HStack>
          </Show>

          <ProfileMenu fullName={fullName} logout={handleLogout} />
        </HStack>
      </Flex>
    </Fragment>
  );
};

export default HeaderNav;
