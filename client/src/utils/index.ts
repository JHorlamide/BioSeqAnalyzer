import { ProjectFormData } from "../schemas/DNASequence/DNASequenceProjectSchema";

class Utils {
  static getErrorMessage(error: any) {
    if (error.data || error.response) {
      return error.data.message ||
        error.response.data.message ||
        error.message ||
        error.error;
    }

    return error;
  }

  static getFilledForm(projectField: any): any {
    return Object.fromEntries(Object.entries(projectField)
      .filter(([_, value]) => value !== "")) as typeof projectField;
  }
}

export default Utils;
