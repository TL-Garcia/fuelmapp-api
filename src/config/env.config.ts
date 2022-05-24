import { envSchema } from 'env-schema';

export type ENV = {
  PORT: string;
  DB_URI: string;
};

const schema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    PORT: {
      type: 'string',
      default: 3000,
    },
    DB_URI: {
      type: 'string',
    },
  },
};

export const loadEnv = () => {
  envSchema({
    schema,
    dotenv: true,
  });
};
