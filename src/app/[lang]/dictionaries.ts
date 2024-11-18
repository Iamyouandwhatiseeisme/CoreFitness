import "server-only";
interface Dictionary {
  [key: string]: DictionaryChapter;
}
export interface DictionaryChapter {
  [key: string]: string;
}

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  "en-US": () =>
    import("./dictionaries/en.json").then((module) => module.default),
  ka: () => import("./dictionaries/ka.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => dictionaries[locale]();
