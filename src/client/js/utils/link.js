export const linkGet = (url, params = {}) => {
  const param = Object.keys(params).map(
    paramName => `${paramName}=${encodeURIComponent(params[paramName])}`
  );
  return `${url}?${param.join('&')}`;
};
