/* Core */
import path from "path";

/* Libraries */
import nodemailer, { Transporter } from "nodemailer";
import hbs, { NodemailerExpressHandlebarsOptions } from "nodemailer-express-handlebars";

/* Application Modules */
import { ServerError } from "../../../common/exceptions/ApiError";
import { logger } from "../../../config/logger";
import config from "../../../config/appConfig";


interface SendEmail {
  receiverMail: string;
  receiverName: string;
  senderName: string;
  projectName: string;
  link: string;
}

class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.userEmail,
        pass: config.password
      },
    });

    const handlebarOptions: NodemailerExpressHandlebarsOptions = {
      viewEngine: {
        partialsDir: path.resolve("./views"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./views"),
    };

    this.transporter.use("compile", hbs(handlebarOptions));
  }

  public async sendEmail(mailParams: SendEmail) {
    const { receiverMail, receiverName, senderName, projectName, link } = mailParams;

    const mailOption = {
      from: "BioSeqAnalyzer",
      template: "email",
      to: receiverMail,
      subject: `${projectName} project invitation`,
      context: { receiverName, senderName, projectName, link },
    };

    try {
      await this.transporter.sendMail(mailOption);
    } catch (error: any) {
      logger.error(`Sending email error: ${error.message}`);
      throw new ServerError(`Unable to send email: ${error.message}`);
    }
  }
}

export default new MailService();
