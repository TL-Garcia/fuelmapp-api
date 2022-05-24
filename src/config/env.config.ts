import { envSchema } from 'env-schema';

export type Env = {
  PORT: string;
  DB_URI: string;
};

const schema = {
  type: 'object',
  required: ['DB_URI'],
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

export const env = envSchema<Env>({
  schema,
  dotenv: true,
});
