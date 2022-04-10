import Fastify from 'fastify';
import fastifyEnv from 'fastify-env';
import fastifyMongodb from 'fastify-mongodb';

import { Router } from './routes';
import { envConfig } from './config';

export const buildServer = async (options?: any) => {
  const server = Fastify(options);

  await server.register(fastifyEnv, envConfig);
  server.register(Router);

  server.register(fastifyMongodb, {
    forceClose: true,
    url: server.config.DB_URI,
  });

  return server;
};
