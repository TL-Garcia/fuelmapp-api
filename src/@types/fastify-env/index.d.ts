import { FastifyInstance as RealFastify, FastifyRequest } from 'fastify';

import { ENV } from '../../config';

declare global {
  interface Service<Document> {
    updateAll: (documents: Document[]) => Promise<void>;
    getOne: (query?: any) => Document[];
  }
  type QueryRequest<Query> = FastifyRequest<{ Querystring: { query: Query } }>;
}

declare module 'fastify' {
  interface FastifyInstance extends RealFastify {
    config: ENV;
    Stations: Service<any>;
  }
}

export {};
