//Nest
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';

//Modules
import { AppModule } from './app.module';

//Services

async function bootstrap() {
   
  //requires

  // const mode = require('./environment/environment');
  const http = require("http");
  const https = require("https");
  const fs = require("fs");
  const express = require("express");


const httpsOptions = {
  key: fs.readFileSync('src/secrets/private.key'),
  cert: fs.readFileSync('src/secrets/certificate.crt'),
};

const server = express();
const app = await NestFactory.create(
  AppModule,
  new ExpressAdapter(server),
);
await app.init();

const httpsServer = https.createServer(httpsOptions, server).listen(443);

const httpServer = http.createServer(function (req, res) {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
}).listen(80);


// const env = process.env.NODE_ENV;
// console.log(env);
}
bootstrap();
