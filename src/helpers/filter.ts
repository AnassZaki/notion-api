type Query = {
  [propertyName: string]: { type: any; id: string; [key: string]: any };
};

type Filter = (
  query: Query,
  type: string
) =>
  | {
      name: string;
      id: string;
    }
  | any;

export const filter: Filter = (query, type) => {
  const keys = Object.keys(query);

  for (let i = 0; i < keys.length; i++) {
    if (query[keys[i]].type === type) {
      return { name: keys[i], id: query[keys[i]].id };
    }
  }

  return query;
};

export default filter;
