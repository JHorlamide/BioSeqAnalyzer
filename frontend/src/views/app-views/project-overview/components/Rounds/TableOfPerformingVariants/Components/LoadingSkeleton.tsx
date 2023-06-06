import { Box, Stack, StackDivider, Skeleton, Text } from '@chakra-ui/react';

interface Props {
  isError: boolean;
  DataLoadingName: string;
}

const LoadingSkeleton = ({ isError, DataLoadingName }: Props) => {
  return (
    <Box
      borderRadius="10px"
      bg="brand_blue.300"
      width="full"
      color="white"
      paddingY={4}
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

      <Stack spacing={3} divider={<StackDivider color="white" width="full" height="full" />}>
        <Box paddingX={3} paddingBottom={0}>
          <Skeleton height="20px" width="60%" />
        </Box>

        <Box paddingX={3}>
          <Skeleton height="20px" width="80%" />
          <Skeleton height="20px" width="60%" marginY={2} />
        </Box>

        <Box paddingX={3}>
          <Skeleton height="20px" width="80%" />
          <Skeleton height="20px" width="60%" marginY={2} />
        </Box>
      </Stack>
    </Box>
  );
}

export default LoadingSkeleton