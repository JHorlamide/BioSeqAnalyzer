import { Box, Stack, StackDivider, Skeleton, Text } from '@chakra-ui/react'

interface Props {
  isError: boolean;
  DataLoadingName: string;
}

const SummaryTableSkeleton = ({ isError, DataLoadingName }: Props) => {
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

export default SummaryTableSkeleton