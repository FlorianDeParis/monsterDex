import { GenerationGames } from './../models/monsterDex.type';
import { PokedexListEntry } from '../models/monsterDex.type';

export const PokedexList: PokedexListEntry[] = [
  {
    label: 'Pokédex National',
    pokedexVariants: [
      {
        pokedexId: 1,
        pokedexVariantName: 'National',
      },
    ],
  },
  {
    label: 'Pokédex de Kanto',
    generation: 1,
    pokedexVariants: [
      {
        pokedexId: 2,
        pokedexVariantName: 'Kanto',
      },
    ],
  },
  {
    label: 'Pokédex de Johto',
    generation: 2,
    pokedexVariants: [
      {
        pokedexId: 3,
        pokedexVariantName: 'Johto',
      },
    ],
  },
  {
    label: "Pokédex d'Hoenn",
    generation: 3,
    pokedexVariants: [
      {
        pokedexId: 4,
        pokedexVariantName: 'Hoenn',
      },
    ],
  },
  {
    label: 'Pokédex de Sinoh',
    generation: 4,
    pokedexVariants: [
      {
        pokedexId: 5,
        pokedexVariantName: 'Pokédex de Piamant / Perle',
      },
      {
        pokedexId: 6,
        pokedexVariantName: 'Pokédex de Platine',
      },
    ],
  },
  {
    label: 'Pokédex de Johto (Gen IV)',
    generation: 4,
    pokedexVariants: [
      {
        pokedexId: 7,
        pokedexVariantName: "Pokédex d'Or-Heartgold / Argent-Soulsilver",
      },
    ],
  },
  {
    label: "Pokédex d'Unys",
    generation: 5,
    pokedexVariants: [
      {
        pokedexId: 8,
        pokedexVariantName: 'Pokédex de Noir / Blanc',
      },
      {
        pokedexId: 9,
        pokedexVariantName: 'Pokédex de Noir 2 / Blanc 2',
      },
    ],
  },
  {
    label: 'Pokédex de Kalos',
    generation: 6,
    pokedexVariants: [
      {
        pokedexId: 12,
        pokedexVariantName: 'Pokédex de Kalos Centre',
      },
      {
        pokedexId: 13,
        pokedexVariantName: 'Pokédex de Kalos Côtes',
      },
      {
        pokedexId: 14,
        pokedexVariantName: 'Pokédex de Kalos Monts',
      },
    ],
  },
  {
    label: "Pokédex d'Hoenn (Gen VI)",
    generation: 6,
    pokedexVariants: [
      {
        pokedexId: 15,
        pokedexVariantName: 'Pokédex de Rubis-Oméga / Saphir-Alpha',
      },
    ],
  },
  {
    label: "Pokédex d'Alola",
    generation: 7,
    pokedexVariants: [
      {
        pokedexId: 16,
        pokedexVariantName: 'Pokédex régional de Soleil / Lune',
      },
      {
        pokedexId: 17,
        pokedexVariantName: 'Pokédex de Soleil / Lune de la région de Melemele',
      },
      {
        pokedexId: 18,
        pokedexVariantName: "Pokédex de Soleil / Lune de la région d'Akala",
      },
      {
        pokedexId: 19,
        pokedexVariantName: "Pokédex de Soleil / Lune de la région d'Ula'ula",
      },
      {
        pokedexId: 20,
        pokedexVariantName: 'Pokédex de Soleil / Lune de la région Poni',
      },
      {
        pokedexId: 21,
        pokedexVariantName: "Pokédex régional d'Ultra-Soleil / Ultra-Lune",
      },
      {
        pokedexId: 22,
        pokedexVariantName:
          "Pokédex d'Ultra-Soleil / Ultra-Lune de la région de Melemele",
      },
      {
        pokedexId: 23,
        pokedexVariantName:
          "Pokédex d'Ultra-Soleil / Ultra-Lune de la région d'Akala",
      },
      {
        pokedexId: 24,
        pokedexVariantName:
          "Pokédex d'Ultra-Soleil / Ultra-Lune de la région d'Ula'ula",
      },
      {
        pokedexId: 25,
        pokedexVariantName:
          "Pokédex d'Ultra-Soleil / Ultra-Lune de la région Poni",
      },
    ],
  },
  {
    label: 'Pokédex de Galar',
    generation: 8,
    pokedexVariants: [
      {
        pokedexId: 27,
        pokedexVariantName: "Pokédex régional d'Épée / Bouclier",
      },
      {
        pokedexId: 28,
        pokedexVariantName:
          "Pokédex d'Épée / Bouclier de la région d'Isolarmure",
      },
      {
        pokedexId: 29,
        pokedexVariantName:
          "Pokédex d'Épée / Bouclier de la région de Couronneige",
      },
    ],
  },
  {
    label: "Pokédex d'Hisui",
    generation: 8,
    pokedexVariants: [
      {
        pokedexId: 30,
        pokedexVariantName: 'Hisui',
      },
    ],
  },
  {
    label: 'Pokédex de Paldea',
    generation: 9,
    pokedexVariants: [
      {
        pokedexId: 31,
        pokedexVariantName: 'Paldea',
      },
    ],
  },
];

export const GenerationGamesList: GenerationGames[] = [
  // Game names are based on version.name and version_group.name values
  {
    generation: 1,
    games: [
      'red-blue',
      'red',
      'blue',
      'yellow',
      'red-japan',
      'green-japan',
      'blue-japan',
    ],
  },
  {
    generation: 2,
    games: ['gold-silver', 'gold', 'silver', 'crystal'],
  },
  {
    generation: 3,
    games: [
      'ruby-sapphire',
      'firered-leafgreen',
      'ruby',
      'sapphire',
      'emerald',
      'firered',
      'leafgreen',
    ],
  },
  {
    generation: 4,
    games: [
      'diamond-pearl',
      'heartgold-soulsilver',
      'diamond',
      'pearl',
      'platinum',
      'heartgold',
      'soulsilver',
    ],
  },
  {
    generation: 5,
    games: [
      'black-white',
      'black-2-white-2',
      'black',
      'white',
      'black-2',
      'white-2',
    ],
  },
  {
    generation: 6,
    games: [
      'x-y',
      'omega-ruby-alpha-sapphire',
      'x',
      'y',
      'omega-ruby',
      'alpha-sapphire',
    ],
  },
  {
    generation: 7,
    games: [
      'sun-moon',
      'ultra-sun-ultra-moon',
      'lets-go-pikachu-lets-go-eevee',
      'sun',
      'moon',
      'ultra-sun',
      'ultra-moon',
      'lets-go-pikachu',
      'lets-go-eevee',
    ],
  },
  {
    generation: 8,
    games: [
      'sword-shield',
      'sword',
      'shield',
      'the-isle-of-armor',
      'the-crown-tundra',
      'brilliant-diamond',
      'shining-pearl',
      'legends-arceus',
    ],
  },
  {
    generation: 9,
    games: ['scarlet', 'violet', 'the-teal-mask', 'the-indigo-disk'],
  },
];
