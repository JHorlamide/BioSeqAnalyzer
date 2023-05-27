import {
  Modal,
  Text,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@chakra-ui/react";
import Button from "../../../../components/CustomBtn/Button";

interface Props {
  projectName: string;
  isOpen: boolean;
  onClose: () => void;
  handleConfirm: () => void;
}

const ConfirmationModal = (props: Props) => {
  const { projectName, isOpen, onClose, handleConfirm } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="brand_blue.300">
        <ModalHeader fontSize="18px">Are you sure you want to delete project ({projectName})?
        </ModalHeader>

        <ModalBody>
          <Text>This is a permanent action and you’ll lose all the information you’ve created within this project.</Text>
        </ModalBody>

        <ModalFooter>
          <Button bg="brand_blue.100" onClick={onClose}>
            Cancel
          </Button>

          <Button
            ml={3}
            bg='red'
            _hover={{ bg: "red" }}
            onClick={handleConfirm}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmationModal