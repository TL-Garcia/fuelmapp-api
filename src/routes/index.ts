import { FastifyInstance } from 'fastify';
import { stationRoutes } from '../stations';

export const Router = async (server: FastifyInstance) => {
  server.register(stationRoutes);
};
