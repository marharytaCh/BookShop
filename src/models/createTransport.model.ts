export interface CreateTransportModel {
  sendMail(mailOptions: import('src/models/mailOption.model').MailOptionModel);
  service?: string;
  port?: number;
  secure?: boolean;
  auth?: {
    user?: string;
    pass?: string;
  };
}
