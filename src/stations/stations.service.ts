import { FastifyInstance } from 'fastify';
import { Station } from './station.type';

export type StationQuery = {};

// TODO: extract the logic for decorating the fastify instance
// with the service into a parent Service class
export class StationsService implements Service<Station> {
  #stations: any; // TODO: Properly type as Collection

  constructor(server: FastifyInstance) {
    if (!server.ready) throw new Error(`can't get .ready from fastify server.`);
    const { mongo } = server;

    if (!mongo || !mongo.db) {
      throw new Error('cant get .mongo from fastify server.');
    }

    const db = mongo.db;
    const collection = db.collection('stations');
    this.#stations = collection;
  }

  getOne(query?: StationQuery) {
    return this.#stations.findOne(query);
  }

  async updateAll(stations: Station[]) {
    const updateOperations = stations.map((s) => ({
      updateOne: {
        filter: { _id: s._id },
        update: { $set: s },
        upsert: true,
      },
    }));

    this.#stations.bulkWrite(updateOperations);
  }

  async checkIsDataStale(maxAge: number) {
    const station = await this.getOne();

    if (!station) {
      return true;
    }

    const age = Date.now() - station._updatedAt.getTime();

    return age >= maxAge;
  }
}
