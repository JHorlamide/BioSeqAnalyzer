import Knot from "../../assets/Knot.webp";
import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";
import Button from "../CustomBtn/Button";
import { APP_PREFIX_PATH } from "../../config/AppConfig";
import useNavigation from "../../hooks/useNavigation";

const EmptyProject = () => {
  const { handleNavigate } = useNavigation();

  return (
    <Center>
      <Flex
        direction="column"
        justify="center"
        maxWidth="250px"
        marginTop="100px"
      >
        <Image src={Knot} boxSize="100px" />

        <Box paddingY={4} display="flex" flexDirection="column">
          <Text as="h1" fontWeight="bold" fontSize="18px">
            Create your first project
          </Text>

          <Text as="p" pt={2}>
            Projects are dedicated spaces for receiving recommendations and
            analyzing results for your protein engineering workflow.
          </Text>
        </Box>

        <Button
          onClick={() => handleNavigate(`${APP_PREFIX_PATH}/create-project`)}
        >
          Create new project
        </Button>
      </Flex>
    </Center>
  );
};

export default EmptyProject;
