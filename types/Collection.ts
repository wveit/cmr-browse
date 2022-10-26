export interface Feed {
  updated: Date;
  id: string;
  title: string;
  entry: Collection[];
}

export interface Collection {
  processing_level_id?: string;
  cloud_hosted: boolean;
  boxes?: string[];
  time_start: string;
  version_id: string;
  dataset_id: string;
  has_spatial_subsetting: boolean;
  has_transforms: boolean;
  has_variables: boolean;
  data_center: string;
  short_name: string;
  organizations?: string[];
  title: string;
  coordinate_system?: CoordinateSystem;
  summary: string;
  time_end?: string;
  service_features: ServiceFeatures;
  orbit_parameters: OrbitParameters;
  id: string;
  has_formats: boolean;
  original_format: OriginalFormat;
  collection_data_type?: CollectionDataType;
  archive_center?: string;
  has_temporal_subsetting: boolean;
  browse_flag: boolean;
  platforms: string[];
  online_access_flag: boolean;
  links?: Link[];
  dif_ids?: string[];
  updated?: Date;
  polygons?: Array<string[]>;
  consortiums?: string[];
  points?: string[];
  associations?: Associations;
  lines?: string[];
}

interface Associations {
  services?: string[];
  tools?: string[];
  variables?: string[];
}

enum CollectionDataType {
  NearRealTime = "NEAR_REAL_TIME",
  ScienceQuality = "SCIENCE_QUALITY",
}

enum CoordinateSystem {
  Cartesian = "CARTESIAN",
  Geodetic = "GEODETIC",
}

export interface Link {
  rel: string;
  hreflang: string;
  href: string;
  length?: string;
  type?: Type;
}

export enum Type {
  ApplicationGMLXML = "application/gml+xml",
}

export interface OrbitParameters {
  swath_width?: string;
  period?: string;
  inclination_angle?: string;
  number_of_orbits?: string;
  start_circular_latitude?: string;
}

export enum OriginalFormat {
  DIF = "DIF",
  Dif10 = "DIF10",
  Echo10 = "ECHO10",
  Iso19115 = "ISO19115",
  UmmJSON = "UMM_JSON",
}

export interface ServiceFeatures {
  opendap: Esi;
  esi: Esi;
  harmony: Esi;
}

export interface Esi {
  has_formats: boolean;
  has_variables: boolean;
  has_transforms: boolean;
  has_spatial_subsetting: boolean;
  has_temporal_subsetting: boolean;
}
