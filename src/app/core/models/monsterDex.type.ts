
export type Description = {
  description: string,
  langague: {
    name: string,
    url: string
  }
}

export type Name = {
  language: {
    name: string,
    url: string
  },
  name: string
}

export type PokemonEntry = {
  entry_number: number,
  pokemon_species:{
    name: string,
    url: string
  }
}

export type VersionGroup = {
  name: string,
  url: string
}

export type Pokedex = {
  descriptions: [
    Description
  ],
  id: number,
  is_main_series: boolean,
  name: string,
  names: [
    Name
  ],
  pokemon_entries: [
    PokemonEntry
  ],
  region: {
    name: string,
    url: string
  },
  version_groups: [
    VersionGroup
  ]
}
