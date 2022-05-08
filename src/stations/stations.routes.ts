import { FastifyInstance } from 'fastify';
import { StationsService } from './stations.service';
import { mapToStation } from './station.mapper';

const GOV_ENDPOINT =
  'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/';

export const stationRoutes = async (server: FastifyInstance) => {
  const Stations = new StationsService(server);

  server.decorate('Stations', Stations);

  server.get('/station', async (req, res) => {
    const { Stations } = server;

    const { query } = req;

    const station = await Stations.getOne(query);

    res.send(station);
  });

  server.get('/station/update-db', async (req, res) => {
    const { Stations } = server;

    const govResponse = await fetch(GOV_ENDPOINT);
    const parsedResponse = await govResponse.json();
    const rawStations = parsedResponse['ListaEESSPrecio'];

    const stations = rawStations.map(mapToStation);

    await Stations.updateAll(stations);
    res.statusCode = 204;
  });
};
