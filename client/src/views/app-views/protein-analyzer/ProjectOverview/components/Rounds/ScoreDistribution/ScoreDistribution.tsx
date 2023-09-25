import { Fragment } from "react"
import { Box, Text } from "@chakra-ui/react";
import Histogram from "./components/Histogram";
import { useGetScoreDistributionQuery } from "../../../../../../../services/project/projectApi";
import HistogramSkeleton from "./components/HistogramSkeleton";

const ScoreDistribution = ({ projectId }: { projectId: string }) => {
  const { data, isLoading, isError } = useGetScoreDistributionQuery({ projectId });

  if (isLoading) {
    return <HistogramSkeleton
      isError={isError}
      barCount={40}
      DataLoadingName="Score distribution"
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