import {
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  Stack
} from "@chakra-ui/react";

const ProjectCardSkeleton = () => {
  return (
    <Card
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
  )
}

export default ProjectCardSkeleton