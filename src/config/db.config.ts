export const getDbConfig = (dbURI: string) => ({
  forceClose: true,
  url: dbURI,
});
