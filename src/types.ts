export type Typology =
  | 'territorio'
  | 'agriturismo'
  | 'rurale'
  | 'bike'
  | 'emozionale';

export interface Structure {
  id: string;
  name: string;
  location: string;
  description: string;
  typology: Typology;
  features: string[];
  distanceFromCervia: string;
  coordinates?: { lat: number; lng: number }; // Optional for visualizing or reference
}

export interface TypologyDetail {
  id: Typology;
  title: string;
  subtitle: string;
  iconName: string; // Will reference Lucide icons dynamically
  description: string;
  colorScheme: string; // e.g. 'emerald', 'amber', 'lime' for accents
}
