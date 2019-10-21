import { Environment } from './environment.model';

const fs = require('fs');

export const dev: Environment = {
  conection: 'http',
  mode: 'dev',
  tokenSecret: fs.readFileSync('src/secrets/jwt.key'),
  tokenLife: 6400,
  refreshTokenLife: 36000,
 };
