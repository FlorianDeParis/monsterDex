import { Name, FlavorText } from '../models/PokeAPI/utilities.type';

type localizedObj = Name | FlavorText

export function filterContentByLocale(locale: string, el: any[]): Array<localizedObj> {
  function isLocalized(el:any): el is Name {
    // return el.name && el?.language?.name === locale;
    return (el as Name).name !== undefined;
  }

  function isFlavoredText(el:any): el is FlavorText {
    // return el.flavor_text && el?.language?.name === locale;
    return (el as FlavorText).flavor_text !== undefined;
  }

  return el.filter(e => {
    if(isLocalized(e)){
      return e.language.name === locale;
    } else if(isFlavoredText(e)){
      return e.language.name === locale;
    }
    return false;
  });
}
