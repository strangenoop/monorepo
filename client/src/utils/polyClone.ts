// From https://rosettacode.org/wiki/Polymorphic_copy#JavaScript

export const polyClone = <T>(value: T) => {
  if (value == null || typeof value !== "object") {
    return value;
  }
  const temp = {} as T;
  for (const key in value) {
    temp[key] = polyClone(value[key]);
  }
  return temp;
};
