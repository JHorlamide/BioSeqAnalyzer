class Utils {
  static navigate(path: string) { }

  static getErrorMessage(error: any) {
    return error.data.message || error.response?.data?.message || error.message;
  }

  static getFilledForm(projectField: any) {
    return Object.fromEntries(Object.entries(projectField)
      .filter(([_, value]) => value !== "")) as typeof projectField;
  }
}

export default Utils;