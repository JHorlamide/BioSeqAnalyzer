import {
  Card,
  CardBody,
  CardHeader,
  SkeletonText,
  SkeletonCircle,
  Stack
} from "@chakra-ui/react";
import { Fragment } from "react";

const ProjectCardSkeleton = () => {
  const skeletons = Array(12).fill('skeleton');

  return (
    <Fragment>
      {skeletons.map((skeleton, index) => (
        <Card
          key={index}
          width={{ base: "100%", md: "322px" }}
          height="140px"
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

    </Fragment>
  )
}

export default ProjectCardSkeleton