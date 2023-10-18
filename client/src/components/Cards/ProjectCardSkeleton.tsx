/* React */
import { Fragment } from "react";

/* Chakra UI */
import {
  Flex,
  Card,
  Stack,
  CardBody,
  CardHeader,
  SkeletonText,
  SkeletonCircle,
} from "@chakra-ui/react";

const ProjectCardSkeleton = () => {
  return (
    <Fragment>
      <Flex gap={6}>
        {[1, 2, 3, 4].map((item) => (
          <Card
            key={item}
            width={{ base: "100%", md: "370px", lg: "270px" }}
            height="140px"
            color="white"
            bg="brand_blue.300"
            borderRadius={10}
            paddingTop={-3}
          >
            <CardHeader
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <SkeletonCircle size="10" />
              <SkeletonCircle size="10" />
            </CardHeader>

            <CardBody marginTop={-6}>
              <Stack>
                <SkeletonText noOfLines={1} skeletonHeight='2' />
                <SkeletonText width="150px" noOfLines={1} skeletonHeight='2' />
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Flex>
    </Fragment>
  )
}

export default ProjectCardSkeleton