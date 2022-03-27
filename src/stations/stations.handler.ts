import { RouteHandlerMethod } from 'fastify';
import * as stationServices from './stations.service';

export const getAllStations: RouteHandlerMethod = async (req, res) => {
  const stations = stationServices.findAll();

  res.send(stations);
};
