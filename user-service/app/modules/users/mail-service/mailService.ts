/* Core */
import path from "path";

/* Libraries */
import nodemailer, { Transporter } from "nodemailer";
import hbs, { NodemailerExpressHandlebarsOptions } from "nodemailer-express-handlebars";

/* Application Modules */
import { ServerError } from "../../../common/exceptions/ApiError";
import { logger } from "../../../config/logger";
import config from "../../../config/appConfig";

interface InvitationEmail {
  receiverMail: string;
  receiverName: string;
  senderName: string;
  projectName: string;
  link: string;
  template: string;
}

type ForgotPasswordEmail = Pick<InvitationEmail, "receiverMail" | "receiverName" | "template" | "link">;

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
        partialsDir: path.resolve("./views/"),
        defaultLayout: false,
      },

      viewPath: path.resolve("./views/"),
    };

    this.transporter.use("compile", hbs(handlebarOptions));
  }

  public async sendInvitationEmail(mailParams: InvitationEmail) {
    const {
      link,
      receiverMail,
      receiverName,
      senderName,
      projectName,
      template,
    } = mailParams;

    const mailOpts = {
      from: "BioSeqAnalyzer",
      template: template,
      to: receiverMail,
      subject: `${projectName} project invitation`,
      context: { receiverName, senderName, projectName, link },
    };

    try {
      await this.transporter.sendMail(mailOpts);
      logger.info(`Email sent successfully to the following recipients: ${receiverMail.toString()}`)
    } catch (error: any) {
      logger.error(`Sending email error: ${error.message}`);
      throw new ServerError(`Unable to send email: ${error.message}`);
    }
  }

  public async sendForgotPasswordMail(mailParam: ForgotPasswordEmail) {
    const { receiverMail, receiverName, template, link } = mailParam;

    const mailOpts = {
      from: "BioSeqAnalyzer",
      template: template,
      to: receiverMail,
      subject: `Password Reset Request`,
      context: { receiverMail, link, receiverName },
    };

    try {
      await this.transporter.sendMail(mailOpts);
      logger.info(`Email sent successfully to the following recipients: ${receiverMail.toString()}`)
    } catch (error: any) {
      logger.error(`Sending email error: ${error.message}`);
      throw new ServerError(`Unable to send email: ${error.message}`);
    }
  }
}

export default new MailService();
