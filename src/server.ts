import Fastify from 'fastify';
import fastifyEnv from 'fastify-env';
import fastifyMongodb from 'fastify-mongodb';

import { Router } from './routes';
import { ENV_CONFIG, getDbConfig } from './config';

export const buildServer = async (options?: any) => {
  const server = Fastify(options);

  await server.register(fastifyEnv, ENV_CONFIG);
  server.register(Router);

  server.register(fastifyMongodb, getDbConfig(server.config));

  return server;
};
