import { Environment, dev, prod } from 'src/environment';

const env = process.env.NODE_ENV;
export const environment = (): Environment => {
    switch (env) {
        case 'production':
            return prod;
        default:
            return dev ;
       }
  };
