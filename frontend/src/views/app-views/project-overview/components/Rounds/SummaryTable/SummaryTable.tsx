import { Box, Text, Stack, StackDivider, Flex, HStack } from '@chakra-ui/react'
import { HiStar } from 'react-icons/hi'
import { useGetSummaryMainMatricesQuery } from '../../../../../../services/project/projectApi'
import { Fragment } from 'react';
import { Sequence } from '../../../../../../services/project/type';
import AppLoader from '../../../../../../components/Loading/AppLoader';

interface SummaryTableProps {
  totalSequence: number;
  hitRate: number;
  topMutants: Sequence[];
  sequencesAboveReferenceCount: number;
  foldImprovement: number;
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
    <Fragment>
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
    </Fragment>
  )
}

const DataLoadingState = () => {
  const containerStyle = {
    borderRadius: "10px",
    bg: "brand_blue.300",
    width: "full",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingY: 20,
    paddingX: 20
  }

  return (
    <Box {...containerStyle}>
      {/* <Text
        color="white"
        fontSize={18}
        textAlign="center"
        fontWeight="semibold"
      >
        loading summary results...
      </Text> */}

      <AppLoader spinnerProps={{ marginTop: -20 }} />
    </Box>
  )
}

const SummaryTable = ({ projectId }: { projectId: string }) => {
  const { data, isLoading, isError } = useGetSummaryMainMatricesQuery({ projectId });

  if (isLoading) {
    return <DataLoadingState />
  }

  if (isError) {
    return <Text
      textAlign="center"
      fontSize={18}
      color="red.500"
    >
      Unable to summary of main matrices results. Please try again later
    </Text>
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
          sequencesAboveReferenceCount={data.data.numSequencesAboveReference.sequencesAboveReferenceCount}
          foldImprovement={data.data.foldImprovement}
        />
      </Stack>
    </Box>
  )
}

export default SummaryTable

{/* <Box paddingX={3}>
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
</Box> */}