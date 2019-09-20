// A "table" in this case is an array of objects

export const indexBy = (key: string, table: {}[]) => {
  let result: { [key: string]: any } = {};
  table.forEach(row => {
    result[key] = row;
  });
  return result;
};

export const enumerate = (key: string, table: {}[]) => {
  return table.map((row, i) => ({ ...row, [key]: i }));
};
