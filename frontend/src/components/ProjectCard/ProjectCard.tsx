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
} from "@chakra-ui/react";
import { BsFolderFill } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import { BiEditAlt } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";

interface ProjectCardProps {
  projectTitle: string;
  updatedAt: string;
}

const ProjectCard = ({ projectTitle, updatedAt }: ProjectCardProps) => {
  return (
    <Card width="322px" height="140px" borderRadius={10} paddingTop={-3}>
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
            <MenuItem display="flex">
              <BiEditAlt size={20} />
              <Text marginLeft={3}>Edit</Text>
            </MenuItem>

            <MenuItem display="flex">
              <MdOutlineDeleteOutline size={20} />
              <Text marginLeft={3}>Delete</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </CardHeader>

      <CardBody marginTop={-6}>
        <Stack>
          <Text fontWeight="semibold" fontSize={20}>
            {projectTitle}
          </Text>
          <Text color="gray.400">Last updated {updatedAt}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProjectCard;
