import { HStack, VStack } from '@chakra-ui/react';
import DocumentUpload from './DocumentUpload/DocumentUpload';
import { ProjectFields } from '../../../../../services/project/type';
import SummaryTable from './SummaryTable/SummaryTable';
import TableOfPerformingVariants from './TableOfPerformingVariants/TableOfPerformingVariants';
import ScoreDistribution from './ScoreDistribution/ScoreDistribution';
import FoldImprovement from './FoldImprovement/FoldImprovement';
import ProteinSequenceViewer from '../ProteinSequenceViewer/ProteinSequenceViewer';

interface Props {
  projectId: string;
  proteinPDBID?: string;
  projectFile?: ProjectFields;
}

const Rounds = ({ projectFile, projectId, proteinPDBID }: Props) => {
  if (!projectFile || !projectFile.fileName) {
    return <DocumentUpload projectId={projectId} />
  }

  // if (isLoading) {
  //   return <p>Loading data...</p>
  // }

  // if (isError) {
  //   return <p>{isError}</p>
  // }

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
        <SummaryTable projectId={projectId} />

        <TableOfPerformingVariants projectId={projectId} />
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