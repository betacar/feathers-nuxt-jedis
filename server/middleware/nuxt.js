import {resolve} from 'path';
import {Nuxt, Builder} from 'nuxt';

// Setup nuxt.js
let config = {};
const buildDone = () => process.emit('nuxt:build:done');

try {
  config = require('../../nuxt.config.js');
} catch (e) {}
config.rootDir = resolve(__dirname, '..', '..')
config.dev = process.env.NODE_ENV !== 'production'

const nuxt = new Nuxt(config)
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build().then(buildDone)
} else {
  process.nextTick(buildDone)
}

// Add nuxt.js middleware
export default nuxt;
