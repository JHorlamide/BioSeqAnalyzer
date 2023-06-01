import { Box, Text } from '@chakra-ui/react';
import AppLoader from '../../../../../components/Loading/AppLoader';

const DataLoadingStatus = ({ isError }: { isError: boolean }) => {
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
      {
        isError &&
        <Text textAlign="center" fontSize={18} color="red.500">
          Could not load results. Please try again later
        </Text>
      }

      <AppLoader spinnerProps={{ marginTop: -20 }} />
    </Box>
  )
}

export default DataLoadingStatus;
