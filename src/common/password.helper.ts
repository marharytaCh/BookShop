import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { Environment, environment } from 'src/environment';
import { CreateTransportModel } from 'src/models/createTransport.model';
import { MailOptionModel } from 'src/models/mailOption.model';

const env: Environment = environment();
@Injectable()
export class Hash {
  constructor() {}

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
      const transportModel: CreateTransportModel = nodemailer.createTransport({
        service: env.serviceMail,
        port: env.emailPort,
        secure: env.secureMail,
        auth: {
          user: env.userMail,
          pass: env.passwordMail,
        },
      });
      const token: number = await Math.random();

      const mailOptions: MailOptionModel = {
        from: env.userMail,
        to: username,
        subject: 'BookShop. Verificate your email!',
        html: `<a href="${url}/users/confirm/${username}/${token}" style = "background-color: red;
                                    color: white;
                                    padding: 1em 1.5em;
                                    text-decoration: none;
                                    text-transform: uppercase;">
        Verificate</a>`,
      };
      await transportModel.sendMail(mailOptions);
      const result = token.toString()
      return result ;
    } catch (error) {
      const messegeError: string = error;

      return messegeError;
    }
  }

  public async resetPassword(username: string) {
    try {
      const transportModel: CreateTransportModel = nodemailer.createTransport({
        service: env.serviceMail,
        port: env.emailPort,
        secure: env.secureMail,
        auth: {
          user: env.userMail,
          pass: env.passwordMail,
        },
      });
      const token: string = await Math.random().toString(36).slice(2, 2 + Math.max(1, Math.min(10))) ;

      const mailOptions: MailOptionModel = {
        from: env.userMail,
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
}
