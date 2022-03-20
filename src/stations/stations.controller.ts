// vendors
import { RouteHandlerMethod } from 'fastify';

// models
import { Station } from './stations.model';

export const getStationsController: RouteHandlerMethod = async (req, res) => {
  const stations = Station.findAll();

  res.send(stations);
};
