import React from "react";
import { Column } from "react-table";
import { Box, Text, Stack, StackDivider, Flex } from '@chakra-ui/react'
import CustomTable from '../../../../../../components/CustomTable/CustomTable'
import { useGetTopVariantsQuery } from "../../../../../../services/project/projectApi";
import { MutationRange } from "./sharedTypes"
import AppLoader from "../../../../../../components/Loading/AppLoader";

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
        loading results...
      </Text> */}
      <AppLoader spinnerProps={{ marginTop: -20 }} />
    </Box>
  )
}

const TableOfPerformingVariants = ({ projectId }: { projectId: string }) => {
  const { data, isLoading, isError } = useGetTopVariantsQuery({ projectId });

  if (isLoading) {
    return <DataLoadingState />
  }

  if (isError) {
    return <Text
      textAlign="center"
      fontSize={18}
      color="red.500"
    >
      Unable to load top performing variants results. Please try again later
    </Text>
  }

  if (!data?.data) {
    return null;
  }

  const columns: Column<MutationRange>[] = React.useMemo(() => [
    {
      Header: 'Mutation',
      accessor: 'mutation',
    },

    {
      Header: "Fitness",
      accessor: "scoreRange",
      Cell: ({ value }) => <Text>{Number(value.min + value.max)}</Text>
    }
  ], []);

  const containerStyle = {
    borderRadius: "10px",
    bg: "brand_blue.300",
    width: "full",
    color: "white",
    paddingY: 4
  }

  return (
    <Box {...containerStyle}>
      <Stack spacing={3} divider={<StackDivider width="full" height="full" />}>
        <Box paddingX={3} paddingBottom={0}>
          <Text fontWeight="semibold" >
            Table of top-performing variants
          </Text>
        </Box>

        <CustomTable
          maxTableData={5}
          columns={columns}
          mutationRanges={data.data.mutationRanges}
        />
      </Stack>
    </Box>
  )
}

export default TableOfPerformingVariants