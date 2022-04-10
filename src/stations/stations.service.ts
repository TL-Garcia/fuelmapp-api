export const findAll = async () => {
  const collection = this.mongo.db.collection('stations');

  const stations = await collection?.find().toArray();

  return stations;
};
