import { NestFactory} from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AllExceptionFilter } from 'src/common/index';

import { AppModule } from 'src/app.module';
import { Environment, environment } from './environment';
import * as mongoose from 'mongoose';

async function bootstrap() {

  const http = require('http');
  const https = require('https');
  const fs = require('fs');
  const express = require('express');
  const server = express();
  const env: Environment = environment();

  mongoose.connect(env.connectionWithMongo,
                  { useNewUrlParser: true,
                    useUnifiedTopology: true });

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
  .addBearerAuth('Authorization', 'header', 'basic')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.init();

  app.useGlobalFilters(new AllExceptionFilter());

  const httpsServer = https.createServer(httpsOptions, server).listen(443);
  const httpServer = http.createServer( (req, res) => {
    res.writeHead(301);
    res.end();
  }).listen(80);

}
bootstrap();
