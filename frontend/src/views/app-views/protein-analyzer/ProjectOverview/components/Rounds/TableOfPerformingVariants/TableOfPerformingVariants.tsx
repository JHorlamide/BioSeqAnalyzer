import React from "react";
import { Box, Text, Stack, StackDivider, Skeleton } from '@chakra-ui/react'
import { Column } from "react-table";
import { useGetTopVariantsQuery } from "../../../../../../../services/project/projectApi";
import { MutationRange } from "./sharedTypes"
import CustomTable from "./Components/CustomTable/CustomTable";

interface LoadingSkeletonProps {
  isError: boolean;
  DataLoadingName: string;
}

const LoadingSkeleton = ({ isError, DataLoadingName }: LoadingSkeletonProps) => {
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

const TableOfPerformingVariants = ({ projectId }: { projectId: string }) => {
  const totalMutationRange = 5;
  const { data, isLoading, isError } = useGetTopVariantsQuery({
    projectId,
    limit: totalMutationRange
  });

  const columns: Column<MutationRange>[] = React.useMemo(() => [
    {
      Header: 'Mutation',
      accessor: 'mutation',
    },

    {
      Header: "Fitness",
      accessor: "scoreRange",
      Cell: ({ value }) => <Text>{Number(value.min * value.max)}</Text>
    }
  ], []);

  if (isLoading) {
    return <LoadingSkeleton
      isError={isError}
      DataLoadingName="Top performing variants"
    />
  }

  if (!data?.data) {
    return null;
  }

  const containerStyle = {
    borderRadius: "10px",
    bg: "brand_blue.300",
    width: "full",
    color: "white",
    paddingY: 4
  }

  return (
    <Box {...containerStyle}>
      <Stack spacing={3} divider={<StackDivider color="white" width="full" height="full" />}>
        <Box paddingX={3} paddingBottom={0}>
          <Text fontWeight="semibold" >
            Table of top-performing variants
          </Text>
        </Box>

        <CustomTable
          columns={columns}
          mutationRanges={data.data ?? []}
        />
      </Stack>
    </Box>
  )
}

export default TableOfPerformingVariants