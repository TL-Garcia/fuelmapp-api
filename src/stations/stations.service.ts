import { FastifyInstance } from 'fastify';
import { Station } from './station.type';

export type StationQuery = {};

// TODO: extract the logic for decorating the fastify instance
// with the service into a parent Service class
export class StationsService implements Service<Station> {
  #collection: any; // TODO: Properly type as Collection
  #cacheData: any;

  constructor(server: FastifyInstance) {
    if (!server.ready) throw new Error(`can't get .ready from fastify server.`);
    const { mongo } = server;

    if (!mongo || !mongo.db) {
      throw new Error('cant get .mongo from fastify server.');
    }

    const db = mongo.db;
    const collection = db.collection('stations');
    const cacheData = db.collection('cacheData');
    this.#collection = collection;
    this.#cacheData = cacheData;
  }

  getOne(query?: StationQuery) {
    return this.#collection.findOne(query);
  }

  async updateAll(stations: Station[]) {
    await this.#collection.drop();
    this.#collection.insertMany(stations);
    this.#cacheData.replaceOne(
      { description: 'Stations update' },
      { updatedAt: new Date() },
      { upsert: true }
    );
  }

  async checkIsDataStale(maxAge: number) {
    const insertMetadata = await this.#cacheData.findOne();

    if (!insertMetadata) {
      return true;
    }

    const { updatedAt } = insertMetadata;

    const age = Date.now() - updatedAt.getTime();

    return age >= maxAge;
  }
}
