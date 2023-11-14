/* React */
import React, { useEffect, useState } from "react";

/* Libraries */
import { CiUser } from "react-icons/ci";
import toast from "react-hot-toast";

/* Application Module */
import ProfileMenu from "./components/ProfileMenu";
import MobileNav from "../MobileNav/MobileNav";
import useErrorToast from "../../hooks/useErrorToast";
import { CgMenuGridO } from "react-icons/cg";
import { useLocation } from "react-router-dom";
import { logoutUser } from "../../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { DNA_SEQ_ENTRY, AUTHENTICATED_ENTRY } from "../../config/AppConfig";
import { useDeleteAccountMutation } from "../../services/user/userServiceAPI";
import { useDeleteProteinProjectsMutation } from "../../services/proteinProject/proteinProjectAPI";
import { deleteDnaSeqProjects } from "../../services/apiService";

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

const MemoizedProfileMenu = React.memo(ProfileMenu);

const HeaderNav = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { handleError } = useErrorToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { email, fullName } = useAppSelector((state) => state.auth.user);
  const [isDashboardPage, setIsDashboardPage] = useState(false);
  const [deleteAccount] = useDeleteAccountMutation();
  const [deleteProteinProjects] = useDeleteProteinProjectsMutation();


  const deleteAccountAndProjects = async () => {
    try {
      await Promise.all([
        deleteProteinProjects({}).unwrap(),
        deleteAccount({}).unwrap(),
      ])
    } catch (error: any) {
      handleError(error.message || error);
    }
  }


  const handleAccountDeletion = async () => {
    try {
      await Promise.all([
        deleteAccountAndProjects(),
        deleteDnaSeqProjects()
      ])

      toast.success("Your account has been deleted successfully");
      dispatch(logoutUser());
    } catch (error: any) {
      handleError(error.message || error);
    }
  }


  useEffect(() => {
    const pathname = location.pathname;
    const isRequiredPath = (pathname === AUTHENTICATED_ENTRY) || (pathname === DNA_SEQ_ENTRY);
    setIsDashboardPage(isRequiredPath);
  }, [location.pathname]);

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

          <MemoizedProfileMenu
            fullName={fullName}
            logout={() => dispatch(logoutUser())}
            deleteAccount={handleAccountDeletion}
          />
        </Flex>
      </HStack>
    </Box>
  );
};

export default HeaderNav;
