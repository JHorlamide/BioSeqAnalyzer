/* Libraries */
import { BsArrowLeft } from "react-icons/bs";

/* Application Modules */
import Button from "../../../../components/CustomBtn/Button";
import ProjectForm from './ProjectForm';
import ProjectFormFileUpload from "./ProjectFormFileUpload";
import { useNavigate } from "react-router-dom";
import {
  useCreateDNASeqProject,
  useCreateDNASeqProjectByImport,
  useCreateDNASeqProjectWithFileUpload
} from '../../../../hooks/DNASequence/useCreateDNASeqProject';

/* Chakra UI */
import {
  Tab,
  Tabs,
  Text,
  HStack,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import ProjectFormDataImport from "./ProjectFormDataImport";

const CreateProject = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const tabStyle = {
    variant: "soft-rounded",
    colorScheme: "gray",
    marginTop: "-5%"
  }

  return (
    <Tabs {...tabStyle}>
      <TabList
        width="full"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
      >
        <HStack spacing={1} display="flex" alignItems="center" alignSelf="flex-start">
          <Button
            color="white"
            bg="brand_blue.300"
            leftIcon={<BsArrowLeft />}
            onClick={handleGoBack}
            marginRight={40}
            _hover={{ bg: "brand_blue.200" }}
          >
            Back
          </Button>

          <Tab _selected={{ bg: "brand_blue.300" }} color="white">CREATE NEW</Tab>
          <Tab _selected={{ bg: "brand_blue.300" }} color="white">UPLOAD FILES</Tab>
          <Tab _selected={{ bg: "brand_blue.300" }} color="white">IMPORT FROM DATABASE</Tab>
        </HStack>
      </TabList>

      <TabPanels>
        <TabPanel>
          <ProjectForm {...useCreateDNASeqProject()} />
        </TabPanel>

        <TabPanel>
          <ProjectFormFileUpload {...useCreateDNASeqProjectWithFileUpload()} />
        </TabPanel>

        <TabPanel>
          <ProjectFormDataImport {...useCreateDNASeqProjectByImport()} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default CreateProject