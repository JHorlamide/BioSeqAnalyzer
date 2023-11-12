/* React */
import React, { useState } from "react"

/* Libraries */
import { FiCopy } from "react-icons/fi";
import toast from "react-hot-toast";

/* Application Modules */
import Button from "../CustomBtn/Button";

/* Chakra UI */
import {
  Box,
  FormControl,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  InputGroup,
  Textarea,
  InputRightElement,
} from "@chakra-ui/react";

interface ShareProjectProps {
  isOpen: boolean;
  projectId: string;
  projectName: string;
  onClose: () => void;
}

const ShareProjectModal = (props: ShareProjectProps) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [message, setMessage] = useState("");
  const { isOpen, onClose, projectId, projectName } = props;

  const sharableLink = `http://localhost:5173/app/dna-sequence/shared/overview/${projectId}?&message=${message}`;

  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setMessage(value);
  }

  const handleCopyProjectLink = () => {
    navigator.clipboard.writeText(sharableLink);
    toast.success("Copied share link to clipboard");
    onClose();
  }

  return (
    <Box width="full">
      <Modal
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />

        <ModalContent color="white" bg="brand_blue.300">
          <ModalHeader>Share {projectName}</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody pb={6}>
            <FormControl mt={4} isRequired>
              <Textarea
                value={message}
                onChange={handleMessage}
                focusBorderColor="white"
                placeholder="Add optional description"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter display="flex" width="full">
            <InputGroup>
              <Input value={sharableLink} disabled />

              <InputRightElement width='6.5rem'>
                <Button
                  type="submit"
                  bg='brand_blue.200'
                  _hover={{ bg: "brand_blue.200" }}
                  borderRadius={0}
                  leftIcon={<FiCopy />}
                  onClick={handleCopyProjectLink}
                >
                  Copy link
                </Button>
              </InputRightElement>
            </InputGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default ShareProjectModal;
