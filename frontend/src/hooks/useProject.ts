import { useState } from "react";
import { useForm } from "react-hook-form";
import { ProjectFormData, projectSchema } from "../schemas/project.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const useProject = () => {
  const [loading, setLoading] = useState();
  const [showRawSeqInput, setShowRawSeqInput] = useState(false);
  const [showUniProtInput, setShowUniProtInput] = useState(true);
  const [animoAcidSequence, setAminoAcidSequence] = useState("");

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProjectFormData>({ resolver: zodResolver(projectSchema) });

  const toggleShowUniProtInput = () => {
    setShowUniProtInput(!showUniProtInput);
    setShowRawSeqInput(!showRawSeqInput);
  };

  const onSubmit = (data: ProjectFormData) => {
    console.log(data);
  };

  return {
    loading,
    showRawSeqInput,
    showUniProtInput,
    onSubmit,
    register,
    handleSubmit,
    errors,
    isValid,
    toggleShowUniProtInput,
    animoAcidSequence
  };
}

export default useProject;


// const [showRawSeqInput, setShowRawSeqInput] = useState(false);
  // const [showUniProtInput, setShowUniProtInput] = useState(true);

  // const toggleShowUniProtInput = () => {
  //   setShowUniProtInput(!showUniProtInput);
  //   setShowRawSeqInput(!showRawSeqInput);
  // };

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isValid },
  // } = useForm<ProjectFormData>({ resolver: zodResolver(projectSchema) });

  // const onSubmit = (data: ProjectFormData) => {
  //   console.log(data);
  // };