/* React */
import { Fragment } from "react";

/* Chakra UI */
import { Box, Text } from "@chakra-ui/react";

/* Application Modules */
import Histogram from "./components/Histogram";
import HistogramSkeleton from "./components/HistogramSkeleton";
import { useGetScoreDistributionQuery } from "../../../../../../../services/project/projectApi";

const ScoreDistribution = ({ projectId }: { projectId: string }) => {
  const { data, isLoading, isError } = useGetScoreDistributionQuery({ projectId });

  if (isLoading) {
    return <HistogramSkeleton
      isError={isError}
      barCount={40}
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