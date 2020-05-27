const DEFAULT_OPTIONS = {
  separator: '&'
};

export function getQueryParamsFromObj(obj, options = DEFAULT_OPTIONS) {
  const objString = Object.entries(obj).flatMap(el => `${el[0]}=${el[1]}`).join(options.separator);
  return `?${objString}`;
}
