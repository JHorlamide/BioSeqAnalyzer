import React, { useState } from "react";
import { Column } from "react-table";
import { MutationRange } from "../../sharedTypes"
import { Box, Text } from "@chakra-ui/react";
import CustomTable from "../../../../../../../../components/CustomTable/CustomTable";

interface Props {
  mutationRanges: MutationRange[];
  maxTableData: number
}

const TopVariantsTable = ({ mutationRanges, maxTableData }: Props) => {
  const [showAll, setShowAll] = useState(false);
  const data = showAll ? mutationRanges : mutationRanges.slice(0, maxTableData);

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

  return (
    <Box width="full">
      <CustomTable
        columns={columns}
        maxTableData={100}
        mutationRanges={mutationRanges}
      />
    </Box>
  )
}

export default TopVariantsTable