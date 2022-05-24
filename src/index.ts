//
import { buildServer } from './server';
import { env } from './config';

const start = async (options?: any) => {
  const server = await buildServer(options);

  const { DB_URI, PORT } = env;

  try {
    server.connectDb(DB_URI);
    server.loadRoutes();
    server.listen(PORT);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start({ logger: true });
