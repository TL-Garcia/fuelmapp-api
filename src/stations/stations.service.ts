import { FastifyInstance } from 'fastify';
import { Station } from './station.type';

export type StationQuery = {};

// TODO: extract the logic for decorating the fastify instance
// with the service into a parent Service class
export class StationsService implements Service<Station> {
  #collection: any;

  constructor(server: FastifyInstance) {
    if (!server.ready) throw new Error(`can't get .ready from fastify server.`);
    const { mongo } = server;

    if (!mongo || !mongo.db) {
      throw new Error('cant get .mongo from fastify server.');
    }

    const db = mongo.db;
    const collection = db.collection('stations');
    this.#collection = collection;
  }

  getOne(query?: StationQuery) {
    return this.#collection.findOne(query);
  }

  async updateAll(stations: Station[]) {
    await this.#collection.drop();
    this.#collection.insertMany(stations);
  }
}
