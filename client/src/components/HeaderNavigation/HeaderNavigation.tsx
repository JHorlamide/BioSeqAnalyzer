/* React */
import { useEffect, useState } from "react";

/* Libraries */
import { CiUser } from "react-icons/ci";

/* Application Module */
import ProfileMenu from "./components/ProfileMenu";
import MobileNav from "../MobileNav/MobileNav";
import { CgMenuGridO } from "react-icons/cg";
import { useLocation } from "react-router-dom";
import { logoutUser } from "../../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { DNA_SEQ_ENTRY, AUTHENTICATED_ENTRY } from "../../config/AppConfig";

/* Chakra UI */
import {
  Flex,
  HStack,
  Text,
  Show,
  useDisclosure,
  Box,
  Spacer,
} from "@chakra-ui/react";

const HeaderNav = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isDashboardPage, setIsDashboardPage] = useState(false);
  const { email, fullName } = useAppSelector((state) => state.auth.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const pathname = location.pathname;
    const isRequiredPath = (pathname === AUTHENTICATED_ENTRY) || (pathname === DNA_SEQ_ENTRY);
    setIsDashboardPage(isRequiredPath);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Box>
      <MobileNav isOpen={isOpen} onClose={onClose} />

      <HStack
        mb={6}
        width="full"
        alignItems="center"
        justifyContent={isDashboardPage ? "space-between" : "flex-end"}
      >
        <Show breakpoint="(max-width: 1350px)">
          <CgMenuGridO
            onClick={onOpen}
            color="white"
            size={40}
            style={{ cursor: "pointer" }}
          />
        </Show>

        <Spacer />

        <Flex
          border={1}
          borderColor="red"
          gap="2"
          alignItems="center"
          justifyContent="end"
          marginLeft={{ base: 1, sm: 1 }}
        >
          <Show breakpoint="(min-width: 844px)">
            {isDashboardPage && (
              <HStack spacing={1} alignItems="center" marginRight={1}>
                <CiUser color="white" fontWeight="bold" />
                <Text color="white">{email}</Text>
              </HStack>
            )}
          </Show>

          <ProfileMenu fullName={fullName} logout={handleLogout} />
        </Flex>
      </HStack>
    </Box>
  );
};

export default HeaderNav;
