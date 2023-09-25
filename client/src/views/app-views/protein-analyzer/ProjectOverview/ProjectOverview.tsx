/* React */
import { useEffect, useState } from 'react';

/* Libraries */
import { Tabs, TabList, TabPanels, Tab, TabPanel, HStack, Skeleton, Stack } from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom';
import { BsArrowLeft } from "react-icons/bs";

/* Application Modules */
import { useGetProjectQuery } from '../../../../services/project/projectApi';
import Button from '../../../../components/CustomBtn/Button';
import Overview from "./components/Overview/Overview"
import Rounds from './components/Rounds/Rounds';

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
  const id = String(projectId);
  const { data: project, isLoading } = useGetProjectQuery({ projectId: id });
  const [activeTab, setActiveTab] = useState(0);

  const {
    proteinPDBID,
    projectTitle,
    projectGoal,
    measuredProperty,
    pdbFileUrl,
    projectFile
  } = project?.data || {};

  useEffect(() => {
    const storedActiveTab = localStorage.getItem("activeTab");
    setActiveTab(Number(storedActiveTab));
  }, []);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    localStorage.setItem("activeTab", String(index));
  };

  const handleGoBack = () => {
    navigate(-1);
    localStorage.setItem("activeTab", "");
  };

  const tabStyle = {
    variant: "soft-rounded",
    colorScheme: "gray",
    marginTop: "-6%"
  }

  return (
    <Tabs
      {...tabStyle}
      index={activeTab}
      onChange={handleTabChange}
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
            _hover={{ bg: "brand_blue.200" }}
            leftIcon={<BsArrowLeft />}
            onClick={handleGoBack}
            marginRight={60}
          >
            Back
          </Button>

          <Tab _selected={{ bg: "brand_blue.300" }} color="white">Overview</Tab>
          <Tab _selected={{ bg: "brand_blue.300" }} color="white">Rounds</Tab>
        </HStack>
      </TabList>

      <TabPanels>
        <TabPanel>
          {isLoading ? (<LoadingSkeleton />) : (
            project && (
              <Overview
                proteinPDBID={proteinPDBID}
                projectTitle={projectTitle}
                projectGoal={projectGoal}
                measuredProperty={measuredProperty}
                pdbFileUrl={pdbFileUrl}
              />
            )
          )}
        </TabPanel>

        <TabPanel>
          <Rounds
            projectId={id}
            projectFile={projectFile}
            proteinPDBID={proteinPDBID}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default ProjectOverview;
