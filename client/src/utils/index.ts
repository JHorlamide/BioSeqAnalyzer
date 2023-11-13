import moment from "moment";

class Utils {
  static getErrorMessage(error: any) {
    if ((error && error.data) || (error && error.response)) {
      return error.data.message ||
        error.response.data.message ||
        error.message ||
        error.error;
    }

    return error;
  }

  static getFilledFormData(projectField: any): any {
    return Object.fromEntries(Object.entries(projectField)
      .filter(([_, value]) => value !== "")) as typeof projectField;
  }

  static formattedDate(date: string | undefined) {
    return moment(date).calendar(null, {
      sameDay: '[Last updated today]',
      lastDay: '[Last updated yesterday]',
      lastWeek: '[Last updated] MMM D, YYYY',
      sameElse: '[Last updated] MMM D, YYYY',
    });
  }

  static capitalizeText(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }
}

export default Utils;
