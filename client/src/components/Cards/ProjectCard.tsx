/* React */
import { Fragment } from "react";

/* Libraries */
import { CiShare1 } from "react-icons/ci";
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
import ShareProjectModal from "../ShareProjectModal/ShareProjectModal";


interface ProjectCardProps {
  projectTitle: string;
  updatedAt: string;
  projectId: string;
  projectType: string;
  loading: boolean;
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
    isOpen: isOpenShare,
    onOpen: onOpenShare,
    onClose: onCloseShare
  } = useDisclosure();

  const {
    projectType,
    updatedAt,
    projectId,
    projectTitle,
    loading,
    handleDeleteProject,
    goToUpdateProjectPage,
    goToProjectDetailsPage
  } = props;

  const handleConfirmDelete = () => {
    handleDeleteProject(projectId);
    onClose();
  };

  const menuItems = [
    {
      key: "inviteMember",
      menuTitle: "Invite colleagues",
      MenuIcon: AiOutlineUserAdd,
      action: (event: React.MouseEvent) => {
        event.stopPropagation();
        onOpenInvite();
      }
    },

    {
      key: "shareProject",
      menuTitle: "Share with colleagues",
      MenuIcon: CiShare1,
      action: (event: React.MouseEvent) => {
        event.stopPropagation();
        onOpenShare();
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

  const TruncateText = ({ text }: { text: string }) => {
    const maxLength = 20;

    if (text.length <= maxLength) {
      return <Text fontWeight="semibold" fontSize={18}>{text}</Text>;
    }

    const truncatedText = `${text.substring(0, maxLength)}...`;
    return <Text fontWeight="semibold" fontSize={18}>{truncatedText}</Text>;
  }

  return (
    <Fragment>
      <InviteMember
        isOpen={isOpenInvite}
        onClose={onCloseInvite}
        projectId={projectId}
        projectName={projectTitle}
      />

      <ShareProjectModal
        isOpen={isOpenShare}
        onClose={onCloseShare}
        projectId={projectId}
        projectName={projectTitle}
      />

      <ConfirmationModal
        projectName={projectTitle}
        isOpen={isOpen}
        onClose={onClose}
        handleConfirm={handleConfirmDelete}
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

          <CardMenu menuItems={projectType === "Protein" ? menuItems.slice(2) : menuItems} />
        </CardHeader>

        <CardBody marginTop={-6}>
          <Stack>
            <TruncateText text={projectTitle} />

            <Flex justifyContent="space-between">
              <Text color="gray.300">{utils.formattedDate(updatedAt)}</Text>

              {loading && (
                <Spinner
                  size="sm"
                  speed="0.65s"
                  thickness="4px"
                  emptyColor="brand_blue.200"
                />
              )}
            </Flex>
          </Stack>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default ProjectCard;
