/* React */
import { useState } from 'react';

/* Chakra UI */
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useBreakpointValue,
  Show,
} from '@chakra-ui/react'


const MobileNote = () => {
  const isMobileBreakPoint = useBreakpointValue({ base: true, md: false }) as boolean;
  const [isMobile, setIsMobile] = useState(isMobileBreakPoint);

  return (
    <Show breakpoint='(max-width: 400px)'>
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
    </Show>
  )
}

export default MobileNote