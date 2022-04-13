import { FastifyInstance as RealFastify } from 'fastify';

import { ENV } from '../../config';

declare module 'fastify' {
  interface FastifyInstance extends RealFastify {
    config: ENV;
  }
}
