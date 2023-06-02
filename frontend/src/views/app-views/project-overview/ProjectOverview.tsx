import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, HStack, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom';
import { useGetProjectQuery } from '../../../services/project/projectApi';

const Overview = React.lazy(() => import("./components/Overview/Overview"));
const Rounds = React.lazy(() => import("./components/Rounds/Rounds"))

const ProjectOverview = () => {
  const { projectId } = useParams();
  const id = String(projectId);
  const { data: project, isLoading } = useGetProjectQuery({ projectId: id });
  const {
    proteinPDBID,
    projectTitle,
    projectGoal,
    measuredProperty,
    pdbFileUrl,
    projectFile
  } = project?.data || {};

  if (isLoading) {
    return <Text color="white" textAlign="center">Loading project details...</Text>
  }

  return (
    <Tabs variant="soft-rounded" colorScheme="gray" marginTop="-6%">
      <TabList
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginRight="75.9%"
      >
        <HStack spacing={5}>
          <Tab _selected={{ bg: "brand_blue.300" }} color="white">Overview</Tab>
          <Tab _selected={{ bg: "brand_blue.300" }} color="white">Rounds</Tab>
        </HStack>
      </TabList>

      <TabPanels>
        <TabPanel>
          {project && (
            <Overview
              proteinPDBID={proteinPDBID}
              projectTitle={projectTitle}
              projectGoal={projectGoal}
              measuredProperty={measuredProperty}
              pdbFileUrl={pdbFileUrl}
            />
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
