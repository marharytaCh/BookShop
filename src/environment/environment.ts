// import {dev} from './environment.dev';
// import {prod} from './environment.prod';

 module.exports = function checkMode(){
  if(process.env.NODE_ENV === "production") {  
    module.exports = require('./environment.prod');    
}
if(process.env.NODE_ENV != "production") {  
  module.exports = require('./environment.dev');   
}
};