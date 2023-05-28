import { Box, Text, Stack, StackDivider, Flex, HStack } from '@chakra-ui/react'
import { HiStar } from 'react-icons/hi'
import { useGetSummaryMainMatricesQuery } from '../../../../../../services/project/projectApi'
import { Fragment } from 'react';

const SummaryTable = ({ projectId }: { projectId: string }) => {
  const { data, isLoading, isError } = useGetSummaryMainMatricesQuery({ projectId });

  if (isLoading) {
    return <Text color="white" fontSize={28} fontWeight="semibold">loading summary...</Text>
  }

  if (isError) {
    return <Text color="white" fontSize={28} fontWeight="semibold">Error {isError}</Text>
  }

  if (!data?.data) {
    return null;
  }

  const summaryTableStyles = {
    borderRadius: '10px',
    bg: 'brand_blue.300',
    width: 'full',
    paddingY: 4,
    color: 'white',
  };

  return (
    <Box {...summaryTableStyles}>
      <Stack spacing={3} divider={<StackDivider width="full" height="0.5px" />}>
        <Box paddingX={3} paddingBottom={0.5}>
          <Text fontWeight="semibold">
            Summary table of main metrics
          </Text>
        </Box>

        <Box paddingX={3}>
          <Text>Total number of sequence</Text>
          <Text fontWeight="bold">{data.data.totalSequence}</Text>
        </Box>

        <Box paddingX={3}>
          <Text>Number hits</Text>
          <Text fontWeight="bold">({data.data.numSequencesAboveReference.hitRate}) hit rate</Text>
        </Box>

        <Box paddingX={3}>
          <HStack spacing={2} justifyContent="center" alignItems="center">
            <HiStar size={20} color="white" />
            <Text fontWeight="semibold" textAlign="center">Best sequence</Text>
          </HStack>

          <Text>Mutations</Text>
          <Flex justifyContent="space-between">
            {data.data.topMutants.map(({ muts, fitness, sequence }, idx) => (
              <Text key={idx} fontWeight="bold">{muts},</Text>
            ))}
          </Flex>
        </Box>

        <Box paddingX={3}>
          <Text>Fitness score</Text>
          <Text fontWeight="bold">{data.data.numSequencesAboveReference.sequencesAboveReferenceCount}</Text>
        </Box>

        <Box paddingX={3}>
          <Text>Fold improvement over wild type</Text>
          <Text fontWeight="bold">{data.data.foldImprovement}</Text>
        </Box>
      </Stack>
    </Box>
  )
}

export default SummaryTable