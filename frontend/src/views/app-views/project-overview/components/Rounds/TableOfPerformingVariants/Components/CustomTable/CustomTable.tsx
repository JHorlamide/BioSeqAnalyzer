import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Box, ChakraProps, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

interface TableProps {
  columns: any[];
  mutationRanges: any[];
  tableProps?: ChakraProps;
}

const CustomTable: React.FC<TableProps> = React.memo((props) => {
  const { columns, mutationRanges, tableProps } = props;

  const mutations = useMemo(() => {
    return Array.isArray(mutationRanges) ? mutationRanges : [];
  }, [mutationRanges]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: mutations });

  return (
    <Box>
      <Table {...getTableProps()} {...tableProps}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  color="white"
                  bg="brand_blue.100"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>

        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()} border="0.1px solid white">
                    <Text>{cell.render("Cell")}</Text>
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
})

export default CustomTable;
