import { Box, Text, Skeleton, Stack, StackDivider } from "@chakra-ui/react";

interface Props {
  barCount: number;
  isError: boolean;
  DataLoadingName: string;
}

const HistogramSkeleton = (props: Props) => {
  const { barCount, isError, DataLoadingName } = props;

  const skeletonBars = Array.from({ length: barCount }, (_, index) => (
    <Box
      key={index}
      height="100px"
      width="20px"
      borderRadius="sm"
      bg="gray.200"
      marginRight="4px"
    >
      <Skeleton
        height="100%"
        width="100%"
        borderRadius="sm"
        startColor="gray.200"
        endColor="gray.400"
        speed={1}
      />
    </Box>
  ));

  return (
    <Box
      borderRadius='10px'
      bg='brand_blue.300'
      width='full'
      paddingTop={20}
      paddingBottom={1}
      color='white'
      paddingX={5}
    >
      <Box marginTop={-16} paddingY={2}>
        <Text color="white">Loading {DataLoadingName}...</Text>
        {
          isError &&
          <Text textAlign="center" fontSize={18} color="red.500">
            Could not load results. Please try again later
          </Text>
        }
      </Box>
      <Stack spacing={3} divider={<StackDivider width="full" height="0.5px" />}>
        <Stack direction="row" spacing="4">
          {skeletonBars}
        </Stack>
      </Stack>
    </Box>
  );
};

export default HistogramSkeleton;
