/* React */
import { Fragment } from "react";

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
import moment from 'moment';
import { BsFolderFill } from "react-icons/bs";

/* Application Modules / Components */
import utils from "../../utils";
import CardMenu from "./CardMenu";
import useErrorToast from "../../hooks/useErrorToast";
import ConfirmationModal from "../Modals/ConfirmationModal";
import { useDeleteProjectMutation } from "../../services/project/projectApi";
import useNavigation from "../../hooks/useNavigation";
import { APP_PREFIX_PATH } from "../../config/AppConfig";

interface ProjectCardProps {
  projectTitle: string;
  updatedAt: string;
  projectId: string;
  projectName: string;
}

const ProjectCard = (props: ProjectCardProps) => {
  const { handleNavigate } = useNavigation();
  const { handleOnError } = useErrorToast();
  const [deleteProject] = useDeleteProjectMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { projectTitle, projectId, projectName, updatedAt } = props;

  const navigate = () => {
    handleNavigate(`${APP_PREFIX_PATH}/project-overview/${projectId}`)
  }

  async function handleDelete() {
    try {
      const response = await deleteProject({ projectId }).unwrap();
      handleOnError(response.message);
    } catch (error) {
      const errorMessage = utils.getErrorMessage(error);
      handleOnError(errorMessage);
    }
  }

  const handleConfirm = () => {
    handleDelete();
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
        projectName={projectName}
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
        onClick={navigate}
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

          <CardMenu projectId={projectId} onOpen={onOpen} />
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
