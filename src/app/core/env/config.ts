import { GenerationGames } from './../models/monsterDex.type';
import { PokedexListEntry } from '../models/monsterDex.type';

export const PokedexList: PokedexListEntry[] = [
  {
    label: 'Pokédex National',
    pokedexVariants: [
      {
        pokedexId: 1,
        pokedexVariantName: 'Pokédex National',
      },
    ],
  },
  {
    label: 'Région de Kanto',
    generation: 1,
    pokedexVariants: [
      {
        pokedexId: 2,
        pokedexVariantName: 'Pokédex de Rouge / Bleu / Jaune',
        generationVariant: 1,
      },
      {
        pokedexId: 0,
        pokedexVariantName: 'Pokédex de Vert Feuille / Rouge Feu',
        isAvailable: false,
        generationVariant: 3,
      },
      {
        pokedexId: 26,
        pokedexVariantName: 'Pokédex de Let\'s Go: Pikachu/Let\'s Go: Évoli',
        generationVariant: 8,
      },
    ],
  },
  {
    label: 'Région de Johto',
    generation: 2,
    pokedexVariants: [
      {
        pokedexId: 3,
        pokedexVariantName: 'Pokédex d\'Or / Argent / Cristal',
        generationVariant: 2,
      },
      {
        pokedexId: 7,
        pokedexVariantName: 'Pokédex d`Or-Heartgold / Argent-Soulsilver',
        generationVariant: 4,
      },
    ],
  },
  {
    label: "Région d'Hoenn",
    generation: 3,
    pokedexVariants: [
      {
        pokedexId: 4,
        pokedexVariantName: 'Pokédex de Pokémon Rubis / Saphire / Émeraude',
        generationVariant: 3,
      },
      {
        pokedexId: 15,
        pokedexVariantName: 'Pokédex de Rubis-Oméga / Saphir-Alpha',
        generationVariant: 6
      },
    ],
  },
  {
    label: 'Région de Sinoh',
    generation: 4,
    pokedexVariants: [
      {
        pokedexId: 5,
        pokedexVariantName: 'Pokédex de Piamant / Perle',
        generationVariant: 4,
      },
      {
        pokedexId: 6,
        pokedexVariantName: 'Pokédex de Platine',
        generationVariant: 4,
      },
      {
        pokedexId: 0,
        pokedexVariantName: 'Pokédex de Diamant Étincelant et Perle Scintillante',
        generationVariant: 8,
        isAvailable: false
      },
    ],
  },
  {
    label: "Région d'Unys",
    generation: 5,
    pokedexVariants: [
      {
        pokedexId: 8,
        pokedexVariantName: 'Pokédex de Noir / Blanc',
        generationVariant: 5,
      },
      {
        pokedexId: 9,
        pokedexVariantName: 'Pokédex de Noir 2 / Blanc 2',
        generationVariant: 5,
      },
      {
        pokedexId: 33,
        pokedexVariantName: 'Pokédex de Écarlate et Violet - Le Disque Indigo',
        generationVariant: 9
      },
    ],
  },
  {
    label: 'Région de Kalos',
    generation: 6,
    pokedexVariants: [
      {
        pokedexId: 12,
        pokedexVariantName: 'Pokédex X/Y, de Kalos Centre',
        generationVariant: 6,
      },
      {
        pokedexId: 13,
        pokedexVariantName: 'Pokédex X/Y, de Kalos Côtes',
        generationVariant: 6,
      },
      {
        pokedexId: 14,
        pokedexVariantName: 'Pokédex X/Y, de Kalos Monts',
        generationVariant: 6,
      },
      {
        pokedexId: 34,
        pokedexVariantName: 'Pokédex de Légendes Pokémon : Z-A',
        generationVariant: 9
      },
      {
        pokedexId: 35,
        pokedexVariantName: 'Pokédex de Légendes Pokémon : Z-A - Méga Dimension',
        generationVariant: 9
      },
    ],
  },
  {
    label: "Région d'Alola",
    generation: 7,
    pokedexVariants: [
      {
        pokedexId: 16,
        pokedexVariantName: 'Pokédex régional de Soleil / Lune',
        generationVariant: 7,
      },
      {
        pokedexId: 17,
        pokedexVariantName: 'Pokédex de Soleil / Lune de la région de Melemele',
        generationVariant: 7,
      },
      {
        pokedexId: 18,
        pokedexVariantName: "Pokédex de Soleil / Lune de la région d'Akala",
        generationVariant: 7,
      },
      {
        pokedexId: 19,
        pokedexVariantName: "Pokédex de Soleil / Lune de la région d'Ula'ula",
        generationVariant: 7,
      },
      {
        pokedexId: 20,
        pokedexVariantName: 'Pokédex de Soleil / Lune de la région Poni',
        generationVariant: 7,
      },
      {
        pokedexId: 21,
        pokedexVariantName: "Pokédex régional d'Ultra-Soleil / Ultra-Lune",
        generationVariant: 7,
      },
      {
        pokedexId: 22,
        pokedexVariantName:
          "Pokédex d'Ultra-Soleil / Ultra-Lune de la région de Melemele",
        generationVariant: 7,
      },
      {
        pokedexId: 23,
        pokedexVariantName:
          "Pokédex d'Ultra-Soleil / Ultra-Lune de la région d'Akala",
        generationVariant: 7,
      },
      {
        pokedexId: 24,
        pokedexVariantName:
          "Pokédex d'Ultra-Soleil / Ultra-Lune de la région d'Ula'ula",
        generationVariant: 7,
      },
      {
        pokedexId: 25,
        pokedexVariantName:
          "Pokédex d'Ultra-Soleil / Ultra-Lune de la région Poni",
        generationVariant: 7,
      },
    ],
  },
  {
    label: 'Région de Galar',
    generation: 8,
    pokedexVariants: [
      {
        pokedexId: 27,
        pokedexVariantName: "Pokédex régional d'Épée / Bouclier",
        generationVariant: 8,
      },
      {
        pokedexId: 28,
        pokedexVariantName:
          "Pokédex d'Épée / Bouclier de la région d'Isolarmure",
        generationVariant: 8,
      },
      {
        pokedexId: 29,
        pokedexVariantName:
          "Pokédex d'Épée / Bouclier de la région de Couronneige",
        generationVariant: 8,
      },
    ],
  },

  {
    label: "Région d'Hisui",
    generation: 8,
    pokedexVariants: [
      {
        pokedexId: 30,
        pokedexVariantName: 'Pokédex de	Légendes Pokémon : Arceus',
        generationVariant: 8,
      },
    ],
  },
  {
    label: 'Région de Paldea',
    generation: 9,
    pokedexVariants: [
      {
        pokedexId: 31,
        pokedexVariantName: 'Pokédex de Écarlate et Violet',
        generationVariant: 9,
      },
    ],
  },
  {
    label: "Région de Septentria",
    generation: 9,
    pokedexVariants: [
      {
        pokedexId: 32,
        pokedexVariantName: 'Pokédex de Écarlate et Violet - Le Masque Turquoise',
        generationVariant: 9,
      }
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
