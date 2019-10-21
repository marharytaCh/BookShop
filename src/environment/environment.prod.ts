import { Environment } from './environment.model';

// tslint:disable-next-line: no-var-requires
const fs = require('fs');

export const prod: Environment = {
  conection: 'http',
  mode: 'production',
  tokenSecret: fs.readFileSync('src/secrets/domain.key'),
  tokenLife: 1800,
  refreshTokenLife: 68000,
};
