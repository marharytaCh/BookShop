import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { Environment, environment } from 'src/environment';
import { CreateTransportModel } from 'src/models/create-transport.model';
import { MailOptionModel } from 'src/models/mail-option.model';

@Injectable()
export class Hash {

  private env: Environment = environment();
  private saltRounds = 10;

  public async getSalt(): Promise<string> {
    const salt: string = await bcrypt.genSalt(this.saltRounds);

    return salt;
  }

  public async getHashing(password: string, salt: string): Promise<string> {
    const hashedPassword: string = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  public async comparePassword(password: string, hash: string): Promise<boolean> {
    const comparedPassword: boolean = await bcrypt.compare(password, hash);

    return comparedPassword;
  }

  public async sendEmail(username: string, url: string) {
    try {
      const { serviceMail, emailPort, secureMail, userMail, passwordMail } = this.env;
      const transportModel: CreateTransportModel = nodemailer.createTransport({
        service: serviceMail,
        port: emailPort,
        secure: secureMail,
        auth: {
          user: userMail,
          pass: passwordMail,
        },
      });
      const token: number = Math.random();

      const mailOptions: MailOptionModel = {
        from: userMail,
        to: username,
        subject: 'BookShop. Verificate your email!',
        html: `<a href="${url}/users/confirm/${username}/${token}" style = "background-color: red;
                                    color: white;
                                    padding: 1em 1.5em;
                                    text-decoration: none;
                                    text-transform: uppercase;">
        Verificate</a>`,
      };
      transportModel.sendMail(mailOptions);
      const result = token.toString()

      return result ;
    } catch (error) {
      const messegeError: string = error;

      return messegeError;
    }
  }

  public async resetPassword(username: string) {
    try {
      const { serviceMail, emailPort, secureMail, userMail, passwordMail } = this.env;
      const transportModel: CreateTransportModel = nodemailer.createTransport({
        service: serviceMail,
        port: emailPort,
        secure: secureMail,
        auth: {
          user: userMail,
          pass: passwordMail,
        },
      });
      const token: string = Math.random().toString(36).substring(2) + Math.max(1, Math.min(10)) ;

      const mailOptions: MailOptionModel = {
        from: userMail,
        to: username,
        subject: 'BookShop. Reset password',
        html: `<p>This is you new password ${token}</p>`,
      };
      await transportModel.sendMail(mailOptions);
      return token ;
    } catch (error) {
      const messegeError: string = error;

      return messegeError;
    }
  }

  public generateId(): string {
    const generateUuidv: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      const uuidv4: string = v.toString(16);

      return uuidv4;
  });

  return generateUuidv; 
}
}
