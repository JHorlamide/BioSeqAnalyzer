/* React */
import { Fragment } from "react";

/* Libraries */
import { BsFolderFill } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";

/* Application Modules / Components */
import utils from "../../utils";
import CardMenu from "./CardMenu";
import ConfirmationModal from "../Modals/ConfirmationModal";
import InviteMember from "../InviteMember/InviteMember";

/* Chakra UI */
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Stack,
  Text,
  Spinner,
  Flex,
  useDisclosure
} from "@chakra-ui/react";


interface ProjectCardProps {
  projectTitle: string;
  updatedAt: string;
  projectId: string;
  goToProjectDetailsPage: (projectId: string) => void;
  goToUpdateProjectPage: (projectId: string) => void;
  handleDeleteProject: (project: string) => void;
}

const ProjectCard = (props: ProjectCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenInvite,
    onOpen: onOpenInvite,
    onClose: onCloseInvite
  } = useDisclosure();

  const {
    updatedAt,
    projectId,
    projectTitle,
    handleDeleteProject,
    goToUpdateProjectPage,
    goToProjectDetailsPage
  } = props;

  const handleConfirm = () => {
    handleDeleteProject(projectId);
    onClose();
  };

  const menuItems = [
    {
      key: "inviteMember",
      menuTitle: "Invite Member",
      MenuIcon: AiOutlineUserAdd,
      action: (event: React.MouseEvent) => {
        event.stopPropagation();
        onOpenInvite();
      }
    },

    {
      key: "editProject",
      menuTitle: "Edit Project details",
      MenuIcon: BiEditAlt,
      action: (event: React.MouseEvent) => {
        event.stopPropagation();
        goToUpdateProjectPage(projectId)
      }
    },

    {
      key: "deleteProject",
      menuTitle: "Delete Project",
      MenuIcon: MdOutlineDeleteOutline,
      action: (event: React.MouseEvent) => {
        event.stopPropagation();
        onOpen();
      }
    },
  ];

  return (
    <Fragment>
      <InviteMember
        isOpen={isOpenInvite}
        onClose={onCloseInvite}
        projectId={projectId}
      />

      <ConfirmationModal
        projectName={projectTitle}
        isOpen={isOpen}
        onClose={onClose}
        handleConfirm={handleConfirm}
      />

      <Card
        width={{ base: "100%", md: "370px", lg: "270px" }}
        height="140px"
        color="white"
        bg="brand_blue.300"
        borderRadius={10}
        paddingTop={-3}
        onClick={() => goToProjectDetailsPage(projectId)}
        _hover={{ cursor: "pointer" }}
      >
        <CardHeader
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <BsFolderFill size={20} />
          </Box>

          <CardMenu menuItems={menuItems} />
        </CardHeader>

        <CardBody marginTop={-6}>
          <Stack>
            <Text fontWeight="semibold" fontSize={18}>
              {projectTitle}
            </Text>

            <Flex justifyContent="space-between">
              <Text color="gray.300">{utils.formattedDate(updatedAt)}</Text>

              {/* {isLoadingDelete && (
                <Spinner
                  size="sm"
                  speed="0.65s"
                  thickness="4px"
                  emptyColor="brand_blue.200"
                />
              )} */}
            </Flex>

          </Stack>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default ProjectCard;
