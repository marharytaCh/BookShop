// Nest
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// Modules
import { AppModule } from './app.module';

// Services

async function bootstrap() {

  // const mode = require('./environment/environment');
  const http = require('http');
  const https = require('https');
  const fs = require('fs');
  const express = require('express');
  const server = express();

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );

  const httpsOptions = {
  key: fs.readFileSync('src/secrets/private.key'),
  cert: fs.readFileSync('src/secrets/certificate.crt'),
};

  const options = new DocumentBuilder()
  .setTitle('My API')
  .setDescription('API description')
  .setSchemes( 'https',  'http')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.init();

  const httpsServer = https.createServer(httpsOptions, server).listen(443);

  const httpServer = http.createServer( (req, res) => {
    res.writeHead(301);
    res.end();
  }).listen(80);

}
bootstrap();
