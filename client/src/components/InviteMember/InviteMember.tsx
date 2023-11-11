/* React */
import React, { Fragment } from "react"

/* Libraries */
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/* Application Modules */
import Button from "../CustomBtn/Button";
import useErrorToast from "../../hooks/useErrorToast";
import { FormInput } from "../CustomInput/FormInput/FormInput";
import { InviteMemberFormData, inviteMemberSchema } from "../../schemas/invitation";
import { useSendProjectInviteMutation } from "../../services/user/userServiceAPI";

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
  projectId: string;
  projectName: string;
  onClose: () => void;
}

type InviteMemberFormFields = {
  userEmail: string;
}

const InviteMember = (props: InviteMemberProps) => {
  const { handleError } = useErrorToast();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { isOpen, onClose, projectId, projectName } = props;
  const [sendProjectInvitation, { isLoading }] = useSendProjectInviteMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InviteMemberFormData>({ resolver: zodResolver(inviteMemberSchema) });

  const submit = async (data: InviteMemberFormData) => {
    try {
      const response = await sendProjectInvitation({
        ...data,
        projectId,
        projectName
      }).unwrap();

      if (response.status === "Success") {
        toast.success(response.message);
        reset();
        onClose();
        return;
      }

      handleError(response.message);
    } catch (error: any) {
      handleError(error.message);
    }
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
              <FormControl mt={4} isRequired>
                <FormLabel>Email</FormLabel>
                <FormInput<InviteMemberFormFields>
                  name="userEmail"
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
                isLoading={isLoading}
              >
                Send Invite
              </Button>

              <Button
                onClick={onClose}
                bg="brand_blue.50"
                _hover={{ bg: "brand_blue.50" }}
              >
                Close
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Fragment>
  )
}

export default InviteMember