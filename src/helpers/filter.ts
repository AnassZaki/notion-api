type Query = {
  [propertyName: string]: { type: any; id: string; [key: string]: any };
};

type FilterResult = {
  [type: string]: {
    name: string;
    id: string;
  };
};

type Filter = (query: Query, types: string[]) => FilterResult;

export const filter: Filter = (query, types) => {
  const keys = Object.keys(query);

  let results: FilterResult = {};

  types.forEach((el: string) => {
    for (let i = 0; i < keys.length; i++) {
      if (query[keys[i]].type === el) {
        return (results[query[keys[i]].type] = {
          name: keys[i],
          id: query[keys[i]].id,
        });
      }
    }
  });

  return results;
};

export default filter;
