//
import { buildServer } from './server';
import { loadEnv } from './config/env.config';

const start = async (options?: any) => {
  loadEnv();
  const server = await buildServer(options);

  const {
    env: { PORT, DB_URI },
  } = process;

  try {
    DB_URI && server.connectDb(DB_URI);
    server.loadRoutes();
    typeof PORT === 'string' && server.listen(PORT);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start({ logger: true });
