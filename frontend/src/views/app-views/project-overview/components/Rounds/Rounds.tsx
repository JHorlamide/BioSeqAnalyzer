import React from 'react';
import { Box, HStack, VStack } from '@chakra-ui/react';
import DocumentUpload from './DocumentUpload/DocumentUpload';
import { ProjectFields } from '../../../../../services/project/type';

const SummaryTable = React.lazy(() => import("./SummaryTable/SummaryTable"));
const TableOfPerformingVariants = React.lazy(() => import("./TableOfPerformingVariants/TableOfPerformingVariants"));
const ScoreDistribution = React.lazy(() => import("./ScoreDistribution/ScoreDistribution"));
const ProteinSequenceViewer = React.lazy(() => import("../ProteinSequenceViewer/ProteinSequenceViewer"));
// const FoldImprovement = React.lazy(() => import("./FoldImprovement/FoldImprovement"));

interface Props {
  projectId: string;
  proteinPDBID?: string;
  projectFile?: ProjectFields;
}

const Rounds = ({ projectFile, projectId, proteinPDBID }: Props) => {
  if (!projectFile) {
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
    <Box width="full">
      <HStack
        spacing={5}
        width="full"
        height="full"
        overflow="auto"
        justifyContent="space-between"
        alignItems="self-start"
        marginBottom={5}
      >
        <VStack spacing={3} maxWidth="xl" width="full" height="full">
          <SummaryTable projectId={projectId} />
          <TableOfPerformingVariants projectId={projectId} />
        </VStack>

        <ProteinSequenceViewer
          proteinPDBID={proteinPDBID}
          containerStyle={containerStyle}
        />
      </HStack>

      <ScoreDistribution projectId={projectId} />
    </Box>
  )
}

export default Rounds