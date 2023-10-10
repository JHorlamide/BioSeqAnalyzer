/* React */ 
import { Fragment } from 'react'

/* Chakra UI */
import { Box, Text, Stack, StackDivider, Flex } from '@chakra-ui/react'

const FoldImprovement = () => {
  return (
    <Fragment>
      <Box alignSelf="self-start">
        <Text fontWeight="semibold" color="white">Performance</Text>
      </Box>

      <Box
        borderRadius="10px"
        bg="brand_blue.300"
        color="white"
        width="full"
        paddingY={4}
      >
        <Stack spacing={3} divider={<StackDivider width="full" height="0.5px" />}>
          <Box paddingX={3}>
            <Text fontWeight="semibold">Total number of sequence</Text>
            <Text fontWeight="bold">384</Text>
          </Box>

          <Box paddingX={3}>
            <Text fontWeight="semibold">Number hits</Text>
            <Text fontWeight="bold">60 (15.62%) hit rate</Text>
          </Box>

          <Box paddingX={3}>
            <Text fontWeight="semibold" textAlign="center">Best sequence</Text>
            <Text fontWeight="semibold">Mutations</Text>
            <Flex justifyContent="space-between">
              {["L215F", "R219V", "L249F", "T317F", "T318C", "L349D"].map((item, idx) => (
                <Text fontWeight="bold" key={idx}>{item}</Text>
              ))}
            </Flex>
          </Box>

          <Box paddingX={3}>
            <Text fontWeight="semibold">Fitness score</Text>
            <Text fontWeight="bold">158</Text>
          </Box>

          <Box paddingX={3}>
            <Text fontWeight="semibold">Fold improvement over wild type</Text>
            <Text fontWeight="bold">13.6</Text>
          </Box>
        </Stack>
      </Box>
    </Fragment>
  )
}

export default FoldImprovement