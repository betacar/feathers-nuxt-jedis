'use strict';

import Feathers from '@feathersjs/client';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';

const host = process.env.FEATHERS_HOST || 'http://localhost:3000';
const socket = io(host, {
  transports: ['websocket'],
  upgrade: false
});
const feathers = Feathers().configure(socketio(socket))
export default feathers;
