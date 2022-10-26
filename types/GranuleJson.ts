export interface GranuleJsonResponse {
  feed: Feed;
}

export interface Feed {
  updated: Date;
  id: string;
  title: string;
  entry: GranuleJson[];
}

export interface GranuleJson {
  boxes: string[];
  time_start: Date;
  updated: Date;
  dataset_id: string;
  data_center: DataCenter;
  title: string;
  coordinate_system: CoordinateSystem;
  day_night_flag: DayNightFlag;
  time_end: Date;
  id: string;
  original_format: OriginalFormat;
  granule_size: string;
  browse_flag: boolean;
  polygons: Array<string[]>;
  collection_concept_id: string;
  online_access_flag: boolean;
  links: Link[];
}

export enum CoordinateSystem {
  Cartesian = "CARTESIAN",
}

export enum DataCenter {
  Pocloud = "POCLOUD",
}

export enum DayNightFlag {
  Unspecified = "UNSPECIFIED",
}

export interface Link {
  rel: string;
  title?: string;
  hreflang: Hreflang;
  href: string;
  type?: Type;
  inherited?: boolean;
  length?: Length;
}

export enum Hreflang {
  EnUS = "en-US",
}

export enum Length {
  The750MB = "75.0MB",
}

export enum Type {
  ImagePNG = "image/png",
}

export enum OriginalFormat {
  UmmJSON = "UMM_JSON",
}
