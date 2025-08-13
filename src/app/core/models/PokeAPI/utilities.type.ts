export interface Description {
  description: string;
  langague: {
    name: string;
    url: string;
  }
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

export interface VersionGameIndex {
  game_index: number;
  version: NamedAPIResource;
}