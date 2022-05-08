import { FastifyInstance } from 'fastify';

type Station = {
  address: {
    county: string; // localidad
    town: string; // municipio
    postalCode: string;
    province: string;
    street: string;
  };
  name: string;
  gasoil: number;
  petrol: number;
};

type StationQuery = {};

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
}
