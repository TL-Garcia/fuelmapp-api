import { Station } from './station.type';

type RawStation = {
  'C.P.': string;
  Dirección: string;
  Horario: string;
  Latitud: string;
  Localidad: string;
  'Longitud (WGS84)': string;
  Margen: string;
  Municipio: string;
  'Precio Biodiesel': string;
  'Precio Bioetanol': string;
  'Precio Gas Natural Comprimido': string;
  'Precio Gas Natural Licuado': string;
  'Precio Gases licuados del petróleo': string;
  'Precio Gasoleo A': string;
  'Precio Gasoleo B': string;
  'Precio Gasoleo Premium': string;
  'Precio Gasolina 95 E10': string;
  'Precio Gasolina 95 E5': string;
  'Precio Gasolina 95 E5 Premium': string;
  'Precio Gasolina 98 E10': string;
  'Precio Gasolina 98 E5': string;
  'Precio Hidrogeno': string;
  Provincia: string;
  Remisión: string;
  Rótulo: string;
  'Tipo Venta': string;
  '% BioEtanol': string;
  '% Éster metílico': string;
  IDEESS: string;
  IDMunicipio: string;
  IDProvincia: string;
  IDCCAA: string;
};

const parseESNumber = (esNumber: string): number => {
  const usNumber = esNumber.replace(',', '.');

  return Number(usNumber);
};

export const mapToStation = (rawStation: RawStation): Station => {
  const address = {
    county: rawStation.Localidad,
    postalCode: rawStation['C.P.'],
    province: rawStation.Provincia,
    street: rawStation['Dirección'],
    town: rawStation.Municipio,
    coordinates: {
      latitude: rawStation.Latitud,
      longitude: rawStation['Longitud (WGS84)'],
    },
  };

  const gasoilPrice = rawStation['Precio Gasoleo A'];
  const petrolPrice = rawStation['Precio Gasolina 95 E5'];

  return {
    _id: rawStation.IDEESS,
    _updatedAt: new Date(),
    address,
    name: rawStation['Rótulo'],
    gasoil: parseESNumber(gasoilPrice),
    petrol: parseESNumber(petrolPrice),
  };
};
