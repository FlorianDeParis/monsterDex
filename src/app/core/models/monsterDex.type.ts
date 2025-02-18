
export type description = {
  description: string,
  langague: {
    name: string,
    url: string
  }
}

export type name = {
  language: {
    name: string,
    url: string
  },
  name: string
}

export type pokemonEntry = {
  entry_number: number,
  pokemon_species:{
    name: string,
    url: string
  }
}

export type version_group = {
  name: string,
  url: string
}

export type pokedex = {
  descriptions: [
    description
  ],
  id: number,
  is_main_series: boolean,
  name: string,
  names: [
    name
  ],
  pokemon_entries: [
    pokemonEntry
  ],
  region: {
    name: string,
    url: string
  },
  version_groups: [
    version_group
  ]
}
