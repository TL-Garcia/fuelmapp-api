//
import { buildServer } from './server';

const start = async (options?: any) => {
  const server = await buildServer(options);

  const {
    config: { PORT },
  } = server;
  try {
    typeof PORT === 'string' && (await server.listen(PORT));
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start({ logger: true });
