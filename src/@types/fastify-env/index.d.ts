import { FastifyInstance as RealFastify } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance extends RealFastify {
    config: {
      PORT: string;
    };
  }
}
