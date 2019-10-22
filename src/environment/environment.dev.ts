import { Environment } from './environment.model';

// tslint:disable-next-line: no-var-requires
const fs = require('fs');

export const dev: Environment = {
  conection: 'http',
  mode: 'dev',
  tokenSecret: fs.readFileSync('src/secrets/jwtKey.key'),
  tokenLife: 6400,
  refreshTokenLife: 36000,
 };
