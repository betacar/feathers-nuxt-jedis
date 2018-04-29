'use strict';

import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import feathers from '@feathersjs/feathers';
import express from '@feathersjs/express';
import configuration from '@feathersjs/configuration';
import rest from '@feathersjs/express/rest';
import socketio from '@feathersjs/socketio';
import handler from '@feathersjs/express/errors';
import notFound from 'feathers-errors/not-found';
import middleware from './middleware';
import services from './services';
import channels from './channels';
import twitter from './twitter';

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.configure(rest());
app.configure(socketio({
  transports: ['websocket']
}));

app.configure(middleware);
app.configure(twitter);
app.configure(services);
app.configure(channels);

app.use(notFound());
app.use(handler());

const host = app.get('host');
const port = app.get('port');

process.on('nuxt:build:done', (err) => {
  if (err) {
    console.error(err); // eslint-disable-line no-console
    process.exit(1);
  }

  const server = app.listen(port);
  server.on('listening', () =>
    console.log(`Feathers application started on ${host}:${port}`) // eslint-disable-line no-console
  )
})

export default app;
