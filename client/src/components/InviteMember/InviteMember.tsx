/* React */
import React, { Fragment } from "react"

/* Libraries */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/* Application Modules */
import Button from "../CustomBtn/Button";
import { FormInput } from "../CustomInput/FormInput/FormInput";
import { InviteMemberFormData, inviteMemberSchema } from "../../schemas/inviteMember";

/* Chakra UI */
import {
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface InviteMemberProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

type InviteMemberFormFields = {
  name: string;
  email: string;
}

const InviteMember = (props: InviteMemberProps) => {
  const { isOpen, onClose, projectId } = props;
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InviteMemberFormData>({ resolver: zodResolver(inviteMemberSchema) });

  const submit = (data: InviteMemberFormData) => {
    console.log({ ...data, projectId });
  }

  return (
    <Fragment>
      <Modal
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />

        <ModalContent color="white" bg="brand_blue.300">
          <ModalHeader>Invite Member to this project</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(submit)}>
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <FormInput<InviteMemberFormFields>
                  name="name"
                  type="text"
                  register={register}
                  errors={errors}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Email</FormLabel>
                <FormInput<InviteMemberFormFields>
                  name="email"
                  type="email"
                  register={register}
                  errors={errors}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                mr={3}
                type="submit"
                bg='brand_blue.200'
                _hover={{ bg: "brand_blue.200" }}
              >
                Send Invite
              </Button>

              <Button
                onClick={onClose}
                bg="brand_blue.50"
                _hover={{ bg: "brand_blue.50" }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Fragment>
  )
}

export default InviteMember