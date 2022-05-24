import Fastify from 'fastify';
import fastifyMongodb from 'fastify-mongodb';

import { Router } from './router';
import { getDbConfig } from './config';

export const buildServer = async (options?: any) => {
  const server = Fastify(options);

  server.decorate('connectDb', (dbURI: string) =>
    server.register(fastifyMongodb, getDbConfig(dbURI))
  );

  server.decorate('loadRoutes', () => server.register(Router));

  return server;
};
