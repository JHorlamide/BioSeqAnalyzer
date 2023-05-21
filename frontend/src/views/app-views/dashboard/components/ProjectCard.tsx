import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { Fragment } from "react";
import { BsFolderFill } from "react-icons/bs";
import moment from 'moment';
import { useDeleteProjectMutation } from "../../../../services/project/projectApi";
import { toast } from "react-hot-toast";
import utils from "../../../../utils";
import ConfirmationModal from "./ConfirmationModal";
import CardMenu from "./CardMenu";

interface ProjectCardProps {
  projectTitle: string;
  updatedAt: string;
  projectId: string;
  projectName: string;
}

const ProjectCard = (props: ProjectCardProps) => {
  const { projectTitle, projectId, projectName, updatedAt } = props;
  const [deleteProject] = useDeleteProjectMutation();
  const { isOpen, onOpen, onClose } = useDisclosure()

  async function handleDelete() {
    try {
      const response = await deleteProject({ projectId }).unwrap();
      toast.error(response.message);
    } catch (error) {
      const errorMessage = utils.getErrorMessage(error);
      toast.error(errorMessage);
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
        width={{ base: "100%", md: "322px" }}
        height="140px"
        borderRadius={10}
        paddingTop={-3}
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
            <Text fontWeight="semibold" fontSize={20}>
              {projectTitle}
            </Text>

            <Text color="gray.400">{formattedDate}</Text>
          </Stack>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default ProjectCard;
