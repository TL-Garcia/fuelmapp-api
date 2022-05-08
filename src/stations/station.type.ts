export type Station = {
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
