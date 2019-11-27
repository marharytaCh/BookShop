import { Environment } from './environment.model';

// tslint:disable-next-line: no-var-requires
const fs = require('fs');

export const dev: Environment = {
  conection: 'http',
  mode: 'dev',
  tokenSecret: fs.readFileSync('src/secrets/jwtKey.key'),
  tokenLife: 60 * 60,
  tokenExpireIn: 60 * 60 * 24,
  connectionWithMongo: 'mongodb+srv://chernysh:SYdEsXxKXaRFd7kS@dbversion01-j2fbg.mongodb.net/shop?retryWrites=true&w=majority',
  serviceMail: 'gmail',
  userMail: 'margomimi82@gmail.com',
  passwordMail: 'Margo1304.',
  emailPort: 587,
  secureMail: false,
  databaseType: 'mysql',
  databaseHost: '127.0.0.1',
  databasePort: 3306,
  databaseUsername: 'root',
  databasePassword: '1304',
  database: 'editions',
};
