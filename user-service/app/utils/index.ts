/* Libraries */
import argon2 from "argon2";

/* Application Modules */
import config from "../config/appConfig";

export class Utils {
  public static async generateTempPassword() {
    const argon2GenPass = await argon2.hash(config.tempPassword);
    const loginPassword = argon2GenPass.split("=")[4].substring(4, 10);
    const temporaryPassword = await argon2.hash(loginPassword);
    return { loginPassword, temporaryPassword };
  }
}