import { Fragment } from "react";
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
    <Fragment>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="18px">Are you sure you want to delete project ({projectName})?
          </ModalHeader>
          <ModalBody>
            <Text>This is a permanent action and you’ll lose all the information you’ve created within this project.</Text>
          </ModalBody>

          <ModalFooter>
            <Button bg="brand.100" onClick={onClose}>
              Cancel
            </Button>

            <Button
              ml={5}
              bg='red'
              _hover={{ bg: "red" }}
              onClick={handleConfirm}>Delete Project</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  )
}

export default ConfirmationModal