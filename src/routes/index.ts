// routes
import { stationRoutes } from '../stations';

// types
import { FastifyInstance } from 'fastify';

export const Router = async (server: FastifyInstance) => {
  server.register(stationRoutes);
};
