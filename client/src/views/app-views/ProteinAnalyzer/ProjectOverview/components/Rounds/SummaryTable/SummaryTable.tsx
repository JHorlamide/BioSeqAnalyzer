import React from "react";
import { Box, Text, Stack, StackDivider, Flex, HStack, Skeleton } from '@chakra-ui/react'
import { HiStar } from 'react-icons/hi'
import { useGetSummaryMainMatricesQuery } from '../../../../../../../services/proteinProject/proteinProjectAPI'
import { Sequence } from '../../../../../../../services/proteinProject/type';

interface SummaryTableProps {
  totalSequence: number;
  hitRate: number;
  topMutants: Sequence[];
  sequencesAboveReferenceCount: number;
  foldImprovement: number;
}

interface LoadingSkeletonProps {
  isError: boolean;
  DataLoadingName: string;
}

const LoadingSkeleton = ({ isError, DataLoadingName }: LoadingSkeletonProps) => {
  return (
    <Box
      borderRadius='10px'
      bg='brand_blue.300'
      width='full'
      paddingY={4}
      color='white'
    >
      <Box paddingX={2} paddingY={2}>
        <Text color="white">Loading {DataLoadingName}...</Text>
        {
          isError &&
          <Text textAlign="center" fontSize={18} color="red.500">
            Could not load results. Please try again later
          </Text>
        }
      </Box>
      <Stack spacing={3} divider={<StackDivider width="full" height="0.5px" />}>
        <Box paddingX={3} paddingBottom={0.5}>
          <Skeleton height="20px" width="40%" />
        </Box>

        <Stack spacing={3} divider={<StackDivider width="full" height="0.5px" />}>
          <Box paddingX={3}>
            <Skeleton height="20px" width="80%" />
            <Skeleton height="20px" width="60%" marginY={1} />
          </Box>

          <Box paddingX={3}>
            <Skeleton height="20px" width="60%" />
            <Skeleton height="20px" width="40%" marginY={1} />
            <Skeleton height="20px" width="80%" marginY={1} />
          </Box>

          <Box paddingX={3}>
            <Skeleton height="20px" width="80%" />
            <Skeleton height="20px" width="40%" marginY={1} />
          </Box>

          <Box paddingX={3}>
            <Skeleton height="20px" width="80%" />
            <Skeleton height="20px" width="40%" marginY={1} />
          </Box>

          <Box paddingX={3}>
            <Skeleton height="20px" width="80%" />
            <Skeleton height="20px" width="40%" marginY={1} />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

const SummaryData = (props: SummaryTableProps) => {
  const {
    totalSequence,
    hitRate,
    topMutants,
    sequencesAboveReferenceCount,
    foldImprovement
  } = props;

  return (
    <Stack spacing={3} divider={<StackDivider width="full" height="0.5px" />}>
      <Box paddingX={3}>
        <Text>Total number of sequence</Text>
        <Text fontWeight="bold">{totalSequence}</Text>
      </Box>

      <Box paddingX={3}>
        <Text>Number hits</Text>
        <Text fontWeight="bold">({hitRate}) hit rate</Text>
      </Box>

      <Box paddingX={3}>
        <HStack spacing={2} justifyContent="center" alignItems="center">
          <HiStar size={20} color="white" />
          <Text fontWeight="semibold" textAlign="center">Best sequence</Text>
          <HiStar size={20} color="white" />
        </HStack>

        <Text>Mutations</Text>
        <Flex justifyContent="space-between">
          {topMutants.map(({ muts, fitness, sequence }, idx) => (
            <Text key={idx} fontWeight="bold">{muts},</Text>
          ))}
        </Flex>
      </Box>

      <Box paddingX={3}>
        <Text>Fitness score</Text>
        <Text fontWeight="bold">{sequencesAboveReferenceCount}</Text>
      </Box>

      <Box paddingX={3}>
        <Text>Fold improvement over wild type</Text>
        <Text fontWeight="bold">{foldImprovement}</Text>
      </Box>
    </Stack>
  )
}

const SummaryTable = ({ projectId }: { projectId: string }) => {
  const { data, isLoading, isError } = useGetSummaryMainMatricesQuery({ projectId });

  if (isLoading) {
    return <LoadingSkeleton
      isError={isError}
      DataLoadingName="Summary table of main matrices"
    />
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

        <SummaryData
          totalSequence={data.data.totalSequence}
          hitRate={data.data.numSequencesAboveReference.hitRate}
          topMutants={data.data.topMutants}
          foldImprovement={data.data.foldImprovement}
          sequencesAboveReferenceCount={data.data.numSequencesAboveReference.sequencesAboveReferenceCount}
        />
      </Stack>
    </Box>
  )
}

const MemoizedSummaryTable = React.memo(SummaryTable);
export default MemoizedSummaryTable;
