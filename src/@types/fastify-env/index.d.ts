import { FastifyInstance as RealFastify, FastifyRequest } from 'fastify';

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
    connectDb: (dbURI: string) => void;
    loadRoutes: () => void;
    Stations: Service<any>;
  }
}

export {};
