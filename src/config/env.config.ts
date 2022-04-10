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

export const envConfig = {
  schema,
  dotenv: true,
};
