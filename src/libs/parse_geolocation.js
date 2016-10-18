export default function parseGeolocation(value) {

  if (!value) {
    return undefined;
  }

  if (typeof value !== 'string') {
    return undefined;
  }

  const points = value
                      .split(',')
                      .filter(p => p !== '')
                      .map(p => p.trim())
                      .map(Number)
                      .filter(p => !isNaN(p));

  return points.length !== 2 ? undefined : points;

};
