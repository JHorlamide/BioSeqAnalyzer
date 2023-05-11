class Utils {
  static navigate(path: string) { }

  static getErrorMessage(error: any) {
    return error.data.message || error.response.data.message || error.message;
  }
}

export default Utils;