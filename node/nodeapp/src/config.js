'use strict';

const cfg = require('12factor-config');

const config = cfg({
  allowedHeaders: {
    env: 'ALLOWED_HEADERS',
    type: 'string',
  },
  allowedOrigins: {
    env: 'ALLOWED_ORIGINS',
    type: 'string',
  },
  appName: {
    name: 'eyedentify',
    env: 'APP_NAME',
    type: 'string',
    required: true,
    value: 'eyedentify',
  },
  debug: {
    env: 'DEBUG',
    type: 'string',
    required: true,
  },
  desiredPort: {
    env: 'PORT',
    type: 'integer',
    required: true,
    value: 8000,
  },
  enableCORS: {
    env: 'ENABLE_CORS',
    type: 'boolean',
  },
  nodeEnv: {
    env: 'NODE_ENV',
    type: 'enum',
    values: ['development', 'production'],
    default: 'production',
  },
});

module.exports = config;
