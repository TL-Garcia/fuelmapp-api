export type Station = {
  _id: string;
  _updatedAt: Date;
  address: {
    county: string; // localidad
    town: string; // municipio
    postalCode: string;
    province: string;
    street: string;
  };
  name: string;
  gasoil: number;
  petrol: number;
};
