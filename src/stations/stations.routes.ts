import { FastifyInstance } from 'fastify';
import * as stationHandlers from './stations.handler';

export const stationRoutes = async (server: FastifyInstance) => {
  server.get('/stations', stationHandlers.getAllStations);
};
