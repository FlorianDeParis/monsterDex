export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface VersionGameIndex {
  game_index: number,
  version: NamedAPIResource
}