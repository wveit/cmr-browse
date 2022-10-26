export interface VariableJson {
  concept_id: string;
  revision_id: number;
  provider_id: string;
  native_id: string;
  name: string;
  long_name: string;
}

export interface VariableUmmJson {
  meta: {
    "revision-id": number;
    deleted: boolean;
    format: string;
    "provider-id": string;
    "user-id": string;
    "native-id": string;
    "concept-id": string;
    "revision-date": string;
    "concept-type": string;
  };
  umm: {
    AdditionalIdentifiers: {
      Identifier: string;
      Description: string;
    }[];
    DataType: string;
    VariableSubType: string;
    StandardName: string;
    Scale: number;
    IndexRanges: {
      LatRange: number[];
      LonRange: number[];
    };
    FillValues: {
      Value: number;
      Type: string;
    }[];
    Sets: {
      Name: string;
      Type: string;
      Size: number;
      Index: number;
    }[];
    Dimensions: {
      Name: string;
      Size: number;
      Type: string;
    }[];
    Definition: string;
    Name: string;
    ValidRanges: {
      Min: number;
      Max: number;
    }[];
    MetadataSpecification: {
      URL: string;
      Name: string;
      Version: string;
    };
    LongName: string;
  };
  associations: {
    collections: {
      "concept-id": string;
    }[];
  };
}
