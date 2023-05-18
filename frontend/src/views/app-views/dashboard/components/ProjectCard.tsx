import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { BsFolderFill } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import { BiEditAlt } from "react-icons/bi";
import moment from 'moment';
import { MdOutlineDeleteOutline } from "react-icons/md";
import useNavigation from "../../../../hooks/useNavigation";
import { APP_PREFIX_PATH } from "../../../../config/AppConfig";
import { useDeleteProjectMutation } from "../../../../services/project/projectApi";
import { toast } from "react-hot-toast";
import utils from "../../../../utils";
import ConfirmationModal from "./ConfirmationModal";
import { Fragment } from "react";

interface ProjectCardProps {
  projectTitle: string;
  updatedAt: string;
  projectId: string;
  projectName: string;
}

const ProjectCard = (props: ProjectCardProps) => {
  const { projectTitle, projectId, projectName, updatedAt  } = props;

  const { handleNavigate } = useNavigation();
  const [deleteProject] = useDeleteProjectMutation();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const navigateToEditProjectPage = () => {
    handleNavigate(`${APP_PREFIX_PATH}/project/update/${projectId}`);
  }

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

          <Menu>
            <MenuButton
              bg="white"
              rounded="full"
              padding={1}
              _hover={{
                cursor: "pointer",
              }}
            >
              <SlOptions size={20} color="black" />
            </MenuButton>

            <MenuList>
              <MenuItem display="flex" onClick={navigateToEditProjectPage}>
                <BiEditAlt size={20} />
                <Text marginLeft={3}>Edit details</Text>
              </MenuItem>

              <MenuItem display="flex" onClick={onOpen}>
                <MdOutlineDeleteOutline size={20} />
                <Text marginLeft={3}>Delete project</Text>
              </MenuItem>
            </MenuList>
          </Menu>
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
