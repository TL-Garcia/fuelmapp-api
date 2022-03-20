// controllers
import { getStationsController } from './stations.controller';

// types
import { FastifyInstance } from 'fastify';

export const stationRoutes = async (server: FastifyInstance) => {
  server.get('/stations', getStationsController);
};
