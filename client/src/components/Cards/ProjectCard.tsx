/* React */
import { Fragment } from "react";

import moment from "moment";
import { BsFolderFill } from "react-icons/bs";

/* Application Modules / Components */
import CardMenu from "./CardMenu";
import useErrorToast from "../../hooks/useErrorToast";
import ConfirmationModal from "../Modals/ConfirmationModal";
import useNavigation from "../../hooks/useNavigation";

/* Libraries / Packages */
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react";

interface ProjectCardProps {
  projectTitle: string;
  updatedAt: string;
  projectId: string;
  goToProjectDetailsPage: (projectId: string) => void;
  handleDeleteProject: (project: string) => void;
}

const ProjectCard = (props: ProjectCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    updatedAt,
    projectTitle,
    projectId,
    handleDeleteProject,
    goToProjectDetailsPage
  } = props;

  // const navigate = () => {
  //   if (projectType === "proteinProject") {
  //     handleNavigate(`${APP_PREFIX_PATH}/project-overview/${projectId}`)
  //   } else {
  //     handleNavigate(`${APP_PREFIX_PATH}/dna-sequence/${projectId}`);
  //   }
  // }

  // async function handleDelete() {
  //   try {
  //     const response = await deleteProject({ projectId: String(projectId) }).unwrap();
  //     handleError(response.message);
  //   } catch (error) {
  //     const errorMessage = utils.getErrorMessage(error);
  //     handleError(errorMessage);
  //   }
  // }

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

          <CardMenu projectId={String(projectId)} onOpen={onOpen} />
        </CardHeader>

        <CardBody marginTop={-6}>
          <Stack>
            <Text fontWeight="semibold" fontSize={18}>
              {projectTitle}
            </Text>

            <Text color="gray.300">{formattedDate}</Text>
          </Stack>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default ProjectCard;
