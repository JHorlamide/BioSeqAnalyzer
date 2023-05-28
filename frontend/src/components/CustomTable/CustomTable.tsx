import { Box, ChakraProps, Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useTable } from "react-table";
import Button from "../CustomBtn/Button";

interface TableProps {
  columns: any[];
  mutationRanges: any[];
  maxTableData: number;
  tableProps?: ChakraProps;
}

const CustomTable: React.FC<TableProps> = (props) => {
  // const [showAll, setShowAll] = useState(false);
  const { columns, mutationRanges, tableProps, maxTableData } = props;
  const data = maxTableData !== 0 ? mutationRanges.slice(0, maxTableData) :  mutationRanges ;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <Box width="full">
      <Table
        {...getTableProps()}
        {...tableProps}
        justifyContent="space-between"
        bg="brand_blue.100"
        height="full"
      >
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </Thead>

        <Tbody
          {...getTableBodyProps()}
          justifyContent="space-between"
          bg="brand_blue.300"
        >
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>
                    <Text>{cell.render("Cell")}</Text>
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      {/* {!showAll && (
        <Button
          width="120px"
          alignSelf="flex-end"
          bg="brand_blue.100"
          onClick={() => setShowAll(true)}
          isDisabled={data.length < 10}
          marginTop="2"
          marginX={2}
          _hover={{ bg: "brand_blue.100" }}
        >
          Load All
        </Button>
      )} */}

      {/* {showAll && (
        <Button
          width="120px"
          alignSelf="flex-end"
          bg="brand_blue.100"
          marginTop="2"
          marginX={2}
          onClick={() => setShowAll(false)}
          _hover={{ bg: "brand_blue.100" }}
        >
          Hide
        </Button>
      )} */}
    </Box>
  );
}

export default CustomTable