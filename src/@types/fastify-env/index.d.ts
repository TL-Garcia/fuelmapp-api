import { FastifyInstance as RealFastify, FastifyRequest } from 'fastify';

import { ENV } from '../../config';

declare global {
  interface Service<Document> {
    checkIsDataStale: (maxAge: number) => Promise<boolean>;
    getOne: (query?: any) => Document[];
    updateAll: (documents: Document[]) => Promise<void>;
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
