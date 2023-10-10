/* Application Modules */
import DashboardHeader from "../../../../components/DashboardHeader/DashboardHeader";

/* Chakra UI */
import { Box } from '@chakra-ui/react';
import useNavigation from "../../../../hooks/useNavigation";
import { APP_PREFIX_PATH } from "../../../../config/AppConfig";

const DNASequenceDashboard = () => {
  const { handleNavigate } = useNavigation()
  const refetch = () => { };
  
  const createProjectPage = () => {
    handleNavigate(`${APP_PREFIX_PATH}/create-dna-project`)
  };

  return (
    <Box width="full">
      <DashboardHeader
        projectType="DNA"
        refetch={refetch}
        createProjectAction={createProjectPage}
      />
    </Box>
  )
}

export default DNASequenceDashboard