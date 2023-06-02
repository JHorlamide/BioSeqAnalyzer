import { Fragment } from "react"
import { Box, Text, Stack, StackDivider } from "@chakra-ui/react";
import DataLoadingStatus from "../../DataLoadingStatus/DataLoadingStatus";
import Histogram from "./components/Histogram";
import { useGetScoreDistributionQuery } from "../../../../../../services/project/projectApi";

const ScoreDistribution = ({ projectId }: { projectId: string }) => {
  const { data, isLoading, isError } = useGetScoreDistributionQuery({ projectId });

  if (isLoading) {
    return <DataLoadingStatus 
      isError={isError} 
      DataLoadingName="score distribution"
    />
  }

  if (!data?.data) {
    return null;
  }

  return (
    <Fragment>
      <Box alignSelf="self-start">
        <Text fontWeight="semibold" color="white">Performance</Text>
      </Box>

      <Box
        borderRadius="10px"
        bg="brand_blue.300"
        width="full"
        color="white"
        paddingY={4}
        paddingX={2}
      >
        <Box paddingX={3} paddingBottom={0}>
          <Text fontWeight="semibold" >
            Score distribution
          </Text>
        </Box>
        <Histogram data={data.data} />
      </Box>
    </Fragment>
  )
}

export default ScoreDistribution