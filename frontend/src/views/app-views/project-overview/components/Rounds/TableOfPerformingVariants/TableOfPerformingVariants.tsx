import React from "react";
import { Column } from "react-table";
import { Box, Text, Stack, StackDivider } from '@chakra-ui/react'
import { useGetTopVariantsQuery } from "../../../../../../services/project/projectApi";
import { MutationRange } from "./sharedTypes"
import LoadingSkeleton from "./Components/LoadingSkeleton";

const CustomTable = React.lazy(() => import("../../../../../../components/CustomTable/CustomTable"));

const TableOfPerformingVariants = ({ projectId }: { projectId: string }) => {
  const { data, isLoading, isError } = useGetTopVariantsQuery({ projectId });

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
          maxTableData={5}
          columns={columns}
          mutationRanges={data.data ?? []}
        />
      </Stack>
    </Box>
  )
}

export default TableOfPerformingVariants