import { ENV } from './env.config';

export const getDbConfig = (env: ENV) => ({
  forceClose: true,
  url: env.DB_URI,
});
