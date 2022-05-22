import { FastifyInstance } from 'fastify';
import { StationsService, StationQuery } from './stations.service';
import { mapToStation } from './station.mapper';

const MAX_CACHE_AGE = 99e19;
const GOV_ENDPOINT =
  'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/';

export const stationRoutes = async (server: FastifyInstance) => {
  const Stations = new StationsService(server);

  server.decorate('Stations', Stations);

  server.get('/station', async (req: QueryRequest<StationQuery>, res) => {
    const { query } = req;

    const isDataStale = await Stations.checkIsDataStale(MAX_CACHE_AGE);

    if (isDataStale) {
      updateDb();
      console.log('### Updating db');
    }

    const station = await Stations.getOne(query);

    res.send(station);
  });

  const updateDb = async () => {
    const govResponse = await fetch(GOV_ENDPOINT);
    const parsedResponse = await govResponse.json();
    const rawStations = parsedResponse;

    const stations = rawStations.map(mapToStation);

    await Stations.updateAll(stations);
  };
};
