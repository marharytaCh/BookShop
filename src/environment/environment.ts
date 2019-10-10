//imports
import { Environment } from './environment.model';
import { dev } from './environment.dev';
import { prod } from './environment.prod'

const env = process.env.NODE_ENV; 

 export const environment = () :Environment => {
   
   switch(env){
    case 'development':
        return dev ;

    case 'production':
        return prod; 
      }
};