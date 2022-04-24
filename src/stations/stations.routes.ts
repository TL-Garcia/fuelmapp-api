import { FastifyInstance } from 'fastify';
import { StationsService } from './stations.service';

export const stationRoutes = async (server: FastifyInstance) => {
  const Stations = new StationsService(server);

  server.decorate('Stations', Stations);

  server.get('/station', async (req, res) => {
    const { Stations } = server;

    const station = await Stations.getOne();

    res.send(station);
  });
};
