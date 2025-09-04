import { NamedAPIResource, VersionGameIndex } from './utilities.type';

export interface Pokemon {
  abilities: PokemonAbility[];
  base_experience: number;
  cries: PokemonCries;
  forms: NamedAPIResource[];
  game_indices: VersionGameIndex[];
  height: number;
  held_items: PokemonHeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonMove[];
  name: string;
  past_abilities?: [];
  past_types: PokemonTypePast[];
  species: NamedAPIResource;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
  weight: number;
}

export interface PokemonAbility {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonCries {
  latest: string;
  legacy: string;
}

export interface PokemonHeldItem {
  item: NamedAPIResource;
  version_details: PokemonHeldItemVersion;
}

export interface PokemonHeldItemVersion {
  version: NamedAPIResource;
  rarity: number;
}

export interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: PokemonMoveVersion[];
}

export interface PokemonMoveVersion {
  level_learned_at: number;
  move_learn_method: NamedAPIResource;
  order?: number | null;
  version_group: NamedAPIResource;
}

export interface PokemonTypePast {
  generation: NamedAPIResource;
  types: PokemonType[];
}

export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonSprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other?: {
    dream_world?: {
      front_default: string | null;
      front_female: string | null;
    };
    home?: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    'official-artwork'?: {
      front_default: string | null;
      front_shiny: string | null;
    };
    showdown?: {
      back_default: string | null;
      back_female: string | null;
      back_shiny: string | null;
      back_shiny_female: string | null;
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
  };
  versions?: PokemonSpritesVersions;
}

export interface PokemonSpritesVersions {
  'generation-i': PokemonSprites_Gen_I;
  'generation-ii': PokemonSprites_Gen_II;
  'generation-iii': PokemonSprites_Gen_III;
  'generation-iv': PokemonSprites_Gen_IV;
  'generation-v': PokemonSprites_Gen_V;
  'generation-vi': PokemonSprites_Gen_VI;
  'generation-vii': PokemonSprites_Gen_VII;
  'generation-viii': PokemonSprites_Gen_VIII;
}

export interface PokemonSprites_Gen_I {
  'red-blue': {
    back_default: string | null;
    back_gray: string | null;
    back_transparent: string | null;
    front_default: string | null;
    front_gray: string | null;
    front_transparent: string | null;
  };
  yellow: {
    back_default: string | null;
    back_gray: string | null;
    back_transparent: string | null;
    front_default: string | null;
    front_gray: string | null;
    front_transparent: string | null;
  };
}

export interface PokemonSprites_Gen_II {
  crystal: {
    back_default: string | null;
    back_shiny: string | null;
    back_shiny_transparent: string | null;
    back_transparent: string | null;
    front_default: string | null;
    front_shiny: string | null;
    front_shiny_transparent: string | null;
    front_transparent: string | null;
  };
  gold: {
    back_default: string | null;
    back_shiny: string | null;
    front_default: string | null;
    front_shiny: string | null;
    front_transparent: string | null;
  };
  silver: {
    back_default: string | null;
    back_shiny: string | null;
    front_default: string | null;
    front_shiny: string | null;
    front_transparent: string | null;
  };
}

export interface PokemonSprites_Gen_III {
  emerald: {
    front_default: string | null;
    front_shiny: string | null;
  };
  'firered-leafgreen': {
    back_default: string | null;
    back_shiny: string | null;
    front_default: string | null;
    front_shiny: string | null;
  };
  'ruby-sapphire': {
    back_default: string | null;
    back_shiny: string | null;
    front_default: string | null;
    front_shiny: string | null;
  };
}

export interface PokemonSprites_Gen_IV {
  'diamond-pearl': {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
  'heartgold-soulsilver': {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
  platinum: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
}

export interface PokemonSprites_Gen_V {
  'black-white': {
    animated: {
      back_default: string | null;
      back_female: string | null;
      back_shiny: string | null;
      back_shiny_female: string | null;
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
}

export interface PokemonSprites_Gen_VI {
  'omegaruby-alphasapphire': {
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
  'x-y': {
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
}

export interface PokemonSprites_Gen_VII {
  icons: {
    front_default: string | null;
    front_female: string | null;
  };
  'ultra-sun-ultra-moon': {
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
}

export interface PokemonSprites_Gen_VIII {
  icons: {
    front_default: string | null;
    front_female: string | null;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}
