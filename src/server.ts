// vendors
import Fastify from 'fastify';
import fastifyEnv from 'fastify-env';

//
import { Router } from './routes';

//
import { envConfig } from './config';

export const buildServer = (options?: any) => {
  const server = Fastify(options);

  server.register(Router);
  server.register(fastifyEnv, envConfig);

  return server;
};
