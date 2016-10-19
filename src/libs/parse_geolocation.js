export default function parseGeolocation(value) {

  const points = (typeof value !== 'string')
  ? []
  : value
          .split(',')
          .filter(p => p !== '')
          .map(p => Number(p.trim()))
          .filter(p => !isNaN(p));

  return points.length !== 2 ? undefined : points;

};
