export interface Environment {
  conection?: string;
  mode?: string;
  tokenSecret?: string;
  tokenLife?: number;
  tokenExpireIn?: number;
  connectionWithMongo?: string;
  serviceMail?: string;
  userMail?: string;
  passwordMail?: string;
  emailPort?: number;
  secureMail?: boolean;
}
