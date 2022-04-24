export type ENV = {
  PORT: string;
  DB_URI: string;
};

const SCHEMA = {
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

export const ENV_CONFIG = {
  schema: SCHEMA,
  dotenv: true,
};
