import Fastify from 'fastify';
import { Router } from './routes';

export const server = Fastify({ logger: true });

const start = async () => {
  const {
    env: { PORT = '3000' },
  } = process;

  try {
    typeof PORT === 'string' && (await server.listen(PORT));

    const address = server.server.address();
    const port = typeof address === 'string' ? address : address?.port;
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

server.register(Router);
start();
