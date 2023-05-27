import { Box, HStack, VStack } from '@chakra-ui/react';
import DocumentUpload from '../../../../../components/DocumentUpload/DocumentUpload';
import { ProjectFields } from '../../../../../services/project/type';
import SummaryTable from './SummaryTable/SummaryTable';
import TableOfPerformingVariants from './TableOfPerformingVariants/TableOfPerformingVariants';
import ScoreDistribution from './ScoreDistribution/ScoreDistribution';
import FoldImprovement from './FoldImprovement/FoldImprovement';
import ProteinSequenceViewer from '../Overview/ProteinSequenceViewer';

interface Props {
  projectId: string;
  proteinPDBID?: string;
  projectFile?: Array<ProjectFields>;
}

const Rounds = ({ projectFile, projectId, proteinPDBID }: Props) => {
  if (!projectFile || projectFile.length === 0) {
    return <DocumentUpload projectId={projectId} />
  }

  const containerStyle = {
    width: "40%",
    height: "600px",
    marginTop: "1%",
    display: "flex",
    justifyContent: "center",
  }

  return (
    <Box width="full" height="full" overflow="auto">
      <HStack spacing={5} justifyContent="space-between">
        <VStack spacing={3}>
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
    </Box>
  )
}

export default Rounds