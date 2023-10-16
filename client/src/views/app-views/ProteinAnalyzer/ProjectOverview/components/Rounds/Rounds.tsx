/* React */
import React from 'react';

/* Chakra UI */
import { Box, HStack, VStack } from '@chakra-ui/react';

/* Application Modules */
import DocumentUpload from '../../../../../../components/DocumentUpload/DocumentUpload';
import ProteinSequenceViewer from '../ProteinSequenceViewer/ProteinSequenceViewer';

const SummaryTable = React.lazy(() => import("./SummaryTable/SummaryTable"));
const TableOfPerformingVariants = React.lazy(() => import("./TableOfPerformingVariants/TableOfPerformingVariants"));
const ScoreDistribution = React.lazy(() => import("./ScoreDistribution/ScoreDistribution"));

interface Props {
  projectId: string;
  proteinPDBID?: string;
  projectFileName?: string;
}

const Rounds = ({ projectFileName, projectId, proteinPDBID }: Props) => {
  if (!projectFileName) {
    return <DocumentUpload projectId={projectId} />
  }

  const containerStyle = {
    width: "40%",
    height: "600px",
    display: "flex",
    justifyContent: "center",
  }

  return (
    <Box width="auto">
      <HStack
        spacing={5}
        width="full"
        height="full"
        overflow="auto"
        justifyContent="space-between"
        alignItems="self-start"
        marginBottom={5}
      >
        <VStack spacing={3} maxWidth="2xl" width="full" height="full">
          <SummaryTable projectId={projectId} />
          <TableOfPerformingVariants projectId={projectId} />
        </VStack>

        {/* I will this error later */}
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