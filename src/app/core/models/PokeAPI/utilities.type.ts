export interface Description {
  description: string;
  langague: {
    name: string;
    url: string;
  };
}

export interface Encounter {
  min_level: number;
  max_level: number;
  condition_values: NamedAPIResource;
  chance: number;
  method: NamedAPIResource;
}

export interface Name {
  language: {
    name: string;
    url: string;
  };
  name: string;
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface VersionEncounterDetail {
  version: NamedAPIResource;
  max_chance: number;
  encounter_details: Encounter[];
}

export interface VersionGameIndex {
  game_index: number;
  version: NamedAPIResource;
}
