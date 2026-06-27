import { VehicleType } from '@/types';
import { IMAGES } from './images';

// Luigi Taxi operates a single vehicle: the Jaecoo J7 SUV.
export const VEHICLE_TYPES: VehicleType[] = [
  {
    id: 'executive',
    name: 'Jaecoo J7 SUV',
    nameDE: 'Jaecoo J7 SUV',
    description:
      'Our modern SUV — spacious, comfortable and impeccably maintained. Premium comfort for every ride, from quick city trips to airport transfers.',
    descriptionDE:
      'Unser moderner SUV – geräumig, komfortabel und bestens gepflegt. Premium-Komfort für jede Fahrt, von der schnellen Stadtfahrt bis zum Flughafentransfer.',
    capacity: 4,
    image: IMAGES.fleet.executive.src,
    imageAlt: IMAGES.fleet.executive.alt,
    imageFallback: IMAGES.fleet.executive.fallback,
    priceMultiplier: 1,
  },
];