import { Box, HStack, VStack } from '@chakra-ui/react';
import DocumentUpload from '../../../../../components/DocumentUpload/DocumentUpload';
import { ProjectFields } from '../../../../../services/project/type';
import SummaryTable from './SummaryTable/SummaryTable';
import TableOfPerformingVariants from './TableOfPerformingVariants/TableOfPerformingVariants';
import ScoreDistribution from './ScoreDistribution/ScoreDistribution';
import FoldImprovement from './FoldImprovement/FoldImprovement';
import ProteinSequenceViewer from '../Overview/ProteinSequenceViewer';
import { useGetProcessCSVDataQuery } from '../../../../../services/project/projectApi';

interface Props {
  projectId: string;
  proteinPDBID?: string;
  projectFile?: Array<ProjectFields>;
}

const Rounds = ({ projectFile, projectId, proteinPDBID }: Props) => {
  if (!projectFile || projectFile.length === 0) {
    return <DocumentUpload projectId={projectId} />
  }

  const { data, isLoading, isError } = useGetProcessCSVDataQuery({ projectId });

  if (isLoading) {
    return <p>Loading data...</p>
  }

  if (isError) {
    return <p>{isError}</p>
  }

  console.log({ data });

  const containerStyle = {
    width: "40%",
    height: "600px",
    marginTop: "1%",
    display: "flex",
    justifyContent: "center",
  }

  return (
    <HStack
      spacing={5}
      width="full"
      height="full"
      overflow="auto"
      justifyContent="space-between"
      alignItems="self-start"
    >
      <VStack spacing={3} maxWidth="xl" width="full" height="full">
        <SummaryTable />
        <TableOfPerformingVariants />
        <ScoreDistribution />
        <FoldImprovement />
      </VStack>

      <ProteinSequenceViewer
        proteinPDBID={proteinPDBID}
        containerStyle={containerStyle}
      />
    </HStack>
  )
}

export default Rounds