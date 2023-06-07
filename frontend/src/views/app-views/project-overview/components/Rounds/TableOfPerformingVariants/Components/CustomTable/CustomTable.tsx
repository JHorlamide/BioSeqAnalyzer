import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Box, ChakraProps, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

interface TableProps {
  columns: any[];
  mutationRanges: any[];
  maxTableData: number;
  tableProps?: ChakraProps;
}

const CustomTable: React.FC<TableProps> = (props) => {
  const { columns, mutationRanges, tableProps, maxTableData } = props;
  const isMaxTableDataValid = maxTableData !== 0;
  const areMutationRangesAvailable = mutationRanges.length > 0;

  const slicedData = useMemo(() => {
    const data = Array.isArray(mutationRanges) ? mutationRanges : [];
    return isMaxTableDataValid && areMutationRangesAvailable ? data.slice(0, maxTableData) : data;
  }, [mutationRanges, maxTableData, isMaxTableDataValid, areMutationRangesAvailable]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: slicedData });


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
}

const CustomTableMemo = React.memo(CustomTable);
export default CustomTableMemo;
