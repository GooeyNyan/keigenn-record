const intlNameRegex = /([A-Z])\S+ ([A-Z])\S+/;

const nameCache: Record<string, string> = {};

export const getAbbreviation = (fullName: string): string => {
  if (!fullName) {
    return "";
  }

  const cache = nameCache[fullName];
  if (cache) {
    return cache;
  }

  let ret = "";

  if (intlNameRegex.test(fullName)) {
    ret = fullName.replace(intlNameRegex, `$1.$2.`);
  } else {
    ret = fullName.slice(0, 2);
  }

  nameCache[fullName] = ret;

  return ret;
};
