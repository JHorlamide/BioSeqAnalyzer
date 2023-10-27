/* React */
import { Fragment } from "react";

/* Libraries */
import moment from "moment";
import { BsFolderFill } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { RiSurroundSoundLine } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";

/* Application Modules / Components */
import CardMenu from "./CardMenu";
import ConfirmationModal from "../Modals/ConfirmationModal";

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
import useNavigation from "../../hooks/useNavigation";
import { APP_PREFIX_PATH } from "../../config/AppConfig";

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
  const { handleNavigate } = useNavigation();

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

  const formattedDate = moment(updatedAt).calendar(null, {
    sameDay: '[Last updated today]',
    lastDay: '[Last updated yesterday]',
    lastWeek: '[Last updated] MMM D, YYYY',
    sameElse: '[Last updated] MMM D, YYYY',
  });

  const menuItems = [
    {
      key: "inviteMember",
      menuTitle: "Invite Member",
      MenuIcon: RiSurroundSoundLine, // Change the Icon to a user Icon
      action: (event: React.MouseEvent) => {
        event.stopPropagation();
        handleNavigate(`${APP_PREFIX_PATH}/invite-member/${projectId}`)
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
              <Text color="gray.300">{formattedDate}</Text>

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
