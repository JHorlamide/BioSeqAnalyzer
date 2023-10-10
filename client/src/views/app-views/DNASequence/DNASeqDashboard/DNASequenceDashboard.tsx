import React from 'react'

/* Application Modules */
import DashboardHeader from "../../../../components/DashboardHeader/DashboardHeader";
import { Box } from '@chakra-ui/react';
import { FormInput } from '../../../../components/FormInput/FormInput';
import { useForm } from 'react-hook-form';

export type DNASequenceFormFields = {
  name: string;
  lastName: string;
  gender: "male" | "female"
}

const DNASequenceDashboard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DNASequenceFormFields>();

  const refetch = () => { };
  const createProjectPage = () => { };

  const onSubmit = (data: any) => {
    console.log({ data })
  }

  return (
    <Box width="full">
      <DashboardHeader
        projectType="DNA"
        refetch={refetch}
        createProjectAction={createProjectPage}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput<DNASequenceFormFields>
          name="name"
          label="Structure (Optional)"
          register={register}
          rules={{ required: "You must enter a name" }}
          errors={errors}
        />
      </form>
    </Box>
  )
}

export default DNASequenceDashboard