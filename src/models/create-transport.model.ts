export interface CreateTransportModel {
  sendMail(mailOptions: import('src/models/mail-option.model').MailOptionModel);
  service?: string;
  port?: number;
  secure?: boolean;
  auth?: {
    user?: string;
    pass?: string;
  };
}
