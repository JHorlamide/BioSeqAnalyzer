/* React */
import { useEffect, useState } from 'react';

/* Libraries */
import { useParams, useNavigate } from 'react-router-dom';
import { BsArrowLeft } from "react-icons/bs";

/* Application Modules */
import { useGetProjectQuery } from '../../../../services/proteinProject/proteinProjectAPI';
import Button from '../../../../components/CustomBtn/Button';
import Overview from "./components/Overview/Overview"
import Rounds from './components/Rounds/Rounds';

/* Chakra UI */
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
  Skeleton,
  Stack,
} from "@chakra-ui/react";

const LoadingSkeleton = () => {
  return (
    <Stack spacing={8}>
      <HStack spacing={3} paddingX={3}>
        <Skeleton height="20px" width="30%" />
        <Skeleton height="20px" width="60%" marginY={1} />
      </HStack>

      <Skeleton height="20%" width="100%" />
    </Stack>
  )
}

const ProjectOverview = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const { data: project, isLoading } = useGetProjectQuery({
    projectId: String(projectId)
  });

  const {
    proteinPDBID,
    projectTitle,
    projectGoal,
    measuredProperty,
    pdbFileUrl,
    projectFileName,
    proteinAminoAcidSequence
  } = project?.data || {};

  useEffect(() => {
    const storedTabIndex = localStorage.getItem("tabIndex");
    setTabIndex(Number(storedTabIndex));
  }, []);

  const handleTabChange = (index: number) => {
    setTabIndex(index);
    localStorage.setItem("tabIndex", String(index));
  };

  const handleGoBack = () => {
    navigate(-1);
    localStorage.setItem("tabIndex", "");
  };

  const tabStyle = {
    variant: "soft-rounded",
    colorScheme: "gray",
    marginTop: "-6.5%"
  }

  return (
    <Tabs
      {...tabStyle}
      index={tabIndex}
      onChange={handleTabChange}
      defaultIndex={tabIndex}
    >
      <TabList
        width="full"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
      >
        <HStack spacing={5} display="flex" alignItems="center" alignSelf="flex-start">
          <Button
            color="white"
            bg="brand_blue.300"
            leftIcon={<BsArrowLeft />}
            onClick={handleGoBack}
            marginRight={60}
            _hover={{ bg: "brand_blue.200" }}
          >
            Back
          </Button>

          <Tab _selected={{ bg: "brand_blue.300" }} color="white">Overview</Tab>
          <Tab _selected={{ bg: "brand_blue.300" }} color="white">Rounds</Tab>
        </HStack>
      </TabList>

      <TabPanels>
        <TabPanel>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <Overview
              proteinPDBID={proteinPDBID}
              projectTitle={projectTitle}
              projectGoal={projectGoal}
              measuredProperty={measuredProperty}
              pdbFileUrl={pdbFileUrl}
              proteinAminoAcidSequence={proteinAminoAcidSequence}
            />
          )}
        </TabPanel>

        <TabPanel>
          <Rounds
            projectId={String(projectId)}
            projectFileName={projectFileName}
            proteinPDBID={proteinPDBID}
            proteinAminoAcidSequence={proteinAminoAcidSequence}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default ProjectOverview;
