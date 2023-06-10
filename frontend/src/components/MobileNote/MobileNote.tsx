import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Fragment, useState } from 'react';


const MobileNote = () => {
  const isMobileBreakPoint = useBreakpointValue({ base: true, md: false }) as boolean;
  const [isMobile, setIsMobile] = useState(isMobileBreakPoint);

  return (
    <Fragment>
      {isMobileBreakPoint && (
        <Modal isOpen={isMobile} onClose={() => setIsMobile(!isMobile)} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton onClick={() => setIsMobile(!isMobile)} />
            <ModalBody>
              <Text>
                A note to mobile users: This app is not yet optimized for small screens. To get the full experience, please view it on a larger screen.
              </Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Fragment>
  )
}

export default MobileNote